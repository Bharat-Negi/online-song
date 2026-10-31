import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// Per-user favourites, bookmarks, playlists and ratings, saved in db.json
const LibraryContext = createContext(null);

const API = "http://localhost:8000/library";
// playlist: "My Playlist" song ids; playlists: custom [{ id, name, songs: [] }]; events: ids the user is going to;
// avatar: profile photo (image path or a small data URL), '' for initials;
// profile: { city, bio, twitter, facebook, instagram, joined }
const emptyProfile = { city: '', bio: '', twitter: '', facebook: '', instagram: '', joined: '' };
const empty = { favourites: [], bookmarks: [], playlist: [], playlists: [], events: [], ratings: {}, avatar: '', profile: emptyProfile };

export function LibraryProvider({ children }) {
    // Re-read on every navigation so a new login loads that user's library
    useLocation();
    const user = sessionStorage.getItem('username') || '';

    const [library, setLibrary] = useState(empty);
    const [isLoaded, setIsLoaded] = useState(false);
    const latestRef = useRef(empty);

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
            }
        }).catch(() => {}).finally(() => {
            setIsLoaded(true);
        });
    }, [user]);

    const save = (change) => {
        const next = { ...latestRef.current, ...change(latestRef.current) };
        latestRef.current = next;
        setLibrary(next);
        if (!user) {
            return;
        }
        const body = JSON.stringify({ id: user, favourites: next.favourites, bookmarks: next.bookmarks, playlist: next.playlist, playlists: next.playlists, events: next.events, ratings: next.ratings, avatar: next.avatar, profile: next.profile });
        const headers = { "content-type": "application/json" };
        // Update the user's record; create it if it does not exist (yet)
        fetch(API + "/" + encodeURIComponent(user), { method: "PUT", headers, body }).then((res) => {
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
        });
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
