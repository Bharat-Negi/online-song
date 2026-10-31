import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { lookupSong } from './musicApi';

// Per-user favourites, bookmarks, playlists and ratings, saved in db.json
const LibraryContext = createContext(null);

const API = "http://localhost:8000/library";
// playlist: "My Playlist" song ids; playlists: custom [{ id, name, songs: [] }]; events: ids the user is going to;
// avatar: profile photo (image path or a small data URL), '' for initials;
// profile: { city, bio, twitter, facebook, instagram, joined };
// songs: Audius / iTunes songs the user saved, by id, so playlists can show them later
const emptyProfile = { city: '', bio: '', twitter: '', facebook: '', instagram: '', joined: '' };
const empty = { favourites: [], bookmarks: [], playlist: [], playlists: [], events: [], ratings: {}, avatar: '', profile: emptyProfile, songs: {} };

// Online song ids look like "au-…" (Audius) or "it-…" (iTunes)
const isOnlineId = (id) => typeof id === 'string' && /^(au|it)-/.test(id);
const onlineOnly = (lib) => ({
    ...lib,
    favourites: lib.favourites.filter(isOnlineId),
    bookmarks: lib.bookmarks.filter(isOnlineId),
    playlist: lib.playlist.filter(isOnlineId),
    playlists: lib.playlists.map((pl) => ({ ...pl, songs: pl.songs.filter(isOnlineId) })),
    ratings: Object.fromEntries(Object.entries(lib.ratings || {}).filter(([id]) => isOnlineId(id)))
});

export function LibraryProvider({ children }) {
    // Re-read on every navigation so a new login loads that user's library
    useLocation();
    const user = sessionStorage.getItem('username') || '';

    const [library, setLibrary] = useState(empty);
    const [isLoaded, setIsLoaded] = useState(false);
    const latestRef = useRef(empty);
    const queueRef = useRef(Promise.resolve());

    useEffect(() => {
        latestRef.current = empty;
        setLibrary(empty);
        setIsLoaded(!user);
        if (!user) {
            return;
        }
        fetch(API + "/" + encodeURIComponent(user)).then((res) => {
            return res.ok ? res.json() : null;
        }).then((resp) => {
            if (resp) {
                const loaded = { ...empty, ...resp };
                latestRef.current = loaded;
                setLibrary(loaded);
                // Songs now come only from Audius / iTunes: drop references to the old local songs
                const cleaned = onlineOnly(loaded);
                if (JSON.stringify(cleaned) !== JSON.stringify(loaded)) {
                    save(() => cleaned);
                }
                repairMissingSongs(cleaned);
            }
        }).catch(() => {}).finally(() => {
            setIsLoaded(true);
        });
        // Load only when the user changes; save/repair always use the latest state through refs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Saved songs whose details are missing (e.g. saved by an older version) are looked up again;
    // songs that no longer exist are removed from favourites, bookmarks and playlists
    const repairMissingSongs = (lib) => {
        const known = lib.songs || {};
        const ids = [...new Set([...lib.favourites, ...lib.bookmarks, ...lib.playlist, ...lib.playlists.flatMap((pl) => pl.songs)])]
            .filter((id) => !known[id]);
        if (ids.length === 0) {
            return;
        }
        Promise.all(ids.map((id) => lookupSong(id).catch(() => undefined))).then((found) => {
            const recovered = {};
            const gone = [];
            found.forEach((song, i) => {
                if (song) {
                    recovered[ids[i]] = song;
                } else if (song === null) {
                    gone.push(ids[i]); // undefined = network problem: keep it and try again next time
                }
            });
            if (Object.keys(recovered).length === 0 && gone.length === 0) {
                return;
            }
            const keep = (id) => !gone.includes(id);
            save((cur) => ({
                songs: { ...(cur.songs || {}), ...recovered },
                favourites: cur.favourites.filter(keep),
                bookmarks: cur.bookmarks.filter(keep),
                playlist: cur.playlist.filter(keep),
                playlists: cur.playlists.map((pl) => ({ ...pl, songs: pl.songs.filter(keep) }))
            }));
        });
    };

    const save = (change) => {
        const next = { ...latestRef.current, ...change(latestRef.current) };
        latestRef.current = next;
        setLibrary(next);
        if (!user) {
            return;
        }
        const body = JSON.stringify({ id: user, favourites: next.favourites, bookmarks: next.bookmarks, playlist: next.playlist, playlists: next.playlists, events: next.events, ratings: next.ratings, avatar: next.avatar, profile: next.profile, songs: next.songs });
        const headers = { "content-type": "application/json" };
        // One save at a time, in order, so an older save can never overwrite a newer one.
        // Update the user's record; create it if it does not exist (yet)
        queueRef.current = queueRef.current.then(() => fetch(API + "/" + encodeURIComponent(user), { method: "PUT", headers, body }).then((res) => {
            if (res.status === 404) {
                return fetch(API, { method: "POST", headers, body });
            }
            return res;
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Server responded with ' + res.status);
            }
        }).catch(() => {
            toast.error('Could not save your change. Is the json-server running?');
        }));
    };

    // Add the id if missing, remove it if present; returns true when added
    const toggleIn = (key, id) => {
        const added = !latestRef.current[key].includes(id);
        save((lib) => ({ [key]: added ? [...lib[key], id] : lib[key].filter((item) => item !== id) }));
        return added;
    };

    // Change one custom playlist
    const updatePlaylist = (playlistId, change) => save((lib) => ({
        playlists: lib.playlists.map((pl) => pl.id === playlistId ? { ...pl, ...change(pl) } : pl)
    }));

    const value = {
        isLoaded,
        avatar: library.avatar,
        setAvatar: (avatar) => save(() => ({ avatar })),
        profile: { ...emptyProfile, ...library.profile },
        // Merge changes into the profile; "joined" is set the first time it is saved
        setProfile: (change) => save((lib) => ({
            profile: { ...emptyProfile, ...lib.profile, ...change, joined: (lib.profile && lib.profile.joined) || new Date().toISOString() }
        })),
        // Keep a copy of an online (Audius / iTunes) song so it can be listed later
        rememberSong: (song) => {
            if (!song.source || (latestRef.current.songs || {})[song.id]) {
                return;
            }
            const { id, name, artist, image, src, time, fullTime, source, link } = song;
            save((lib) => ({ songs: { ...(lib.songs || {}), [id]: { id, name, artist, image, src, time, fullTime, source, link } } }));
        },
        // Any song by id: the app's own songs, or online songs the user saved
        findSong: (id) => (library.songs || {})[id],
        favourites: library.favourites,
        goingEvents: library.events,
        // Everything saved for this user, e.g. for "Download my data"
        exportData: () => ({ ...latestRef.current }),
        clearFavourites: () => save(() => ({ favourites: [] })),
        // Back to an empty library; profile details and photo are kept
        resetLibrary: () => save((lib) => ({ ...empty, avatar: lib.avatar, profile: lib.profile })),
        playlists: library.playlists,
        getPlaylist: (playlistId) => library.playlists.find((pl) => pl.id === playlistId),
        // Returns the new playlist's id
        createPlaylist: (name) => {
            const playlistId = 'pl-' + Date.now();
            save((lib) => ({ playlists: [...lib.playlists, { id: playlistId, name, songs: [] }] }));
            return playlistId;
        },
        renamePlaylist: (playlistId, name) => updatePlaylist(playlistId, () => ({ name })),
        deletePlaylist: (playlistId) => save((lib) => ({ playlists: lib.playlists.filter((pl) => pl.id !== playlistId) })),
        // Returns true when the song was added
        toggleSongInPlaylist: (playlistId, songId) => {
            const pl = latestRef.current.playlists.find((item) => item.id === playlistId);
            const added = !pl.songs.includes(songId);
            updatePlaylist(playlistId, (p) => ({ songs: added ? [...p.songs, songId] : p.songs.filter((id) => id !== songId) }));
            return added;
        },

        isFavourite: (id) => library.favourites.includes(id),
        isBookmarked: (id) => library.bookmarks.includes(id),
        inPlaylist: (id) => library.playlist.includes(id),
        playlist: library.playlist,
        rating: (id) => library.ratings[id],
        toggleFavourite: (id) => toggleIn('favourites', id),
        toggleBookmark: (id) => toggleIn('bookmarks', id),
        bookmarks: library.bookmarks,
        togglePlaylist: (id) => toggleIn('playlist', id),
        isGoing: (eventId) => library.events.includes(eventId),
        toggleGoing: (eventId) => toggleIn('events', eventId),
        // Clicking the current rating again clears it
        setRating: (id, stars) => save((lib) => {
            const ratings = { ...lib.ratings };
            if (ratings[id] === stars) {
                delete ratings[id];
            } else {
                ratings[id] = stars;
            }
            return { ratings };
        })
    };

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
    return useContext(LibraryContext);
}
