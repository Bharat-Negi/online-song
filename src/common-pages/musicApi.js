import { useEffect, useState } from 'react';
import { formatTime } from './playerContext';

// All songs in the app come from these two free APIs (no key, browser-friendly):
// Audius: full-length songs. iTunes: real songs, 30-second previews.
const AUDIUS = 'https://api.audius.co/v1';
const APP_NAME = 'online-song';
const ITUNES = 'https://itunes.apple.com/search';

// Our genre pages -> Audius genre names
const audiusGenres = {
    acoustic: 'Acoustic', ambient: 'Ambient', blues: 'Blues', classical: 'Classical', country: 'Country',
    electronic: 'Electronic', emo: 'Alternative', folk: 'Folk', hardcore: 'Metal', 'hip-hop': 'Hip-Hop/Rap',
    indie: 'Alternative', jazz: 'Jazz', latin: 'Latin', metal: 'Metal', pop: 'Pop', 'pop-punk': 'Punk',
    punk: 'Punk', reggae: 'Reggae', rnb: 'R&B/Soul', rock: 'Rock', soul: 'R&B/Soul', world: 'World'
};

export const audiusGenreFor = (slug) => audiusGenres[slug];

// Indian music: official songs from iTunes (previews), searched by these terms
export const indianCollections = [
    { key: 'bollywood', label: 'Bollywood', query: 'bollywood' },
    { key: 'punjabi', label: 'Punjabi', query: 'punjabi' },
    { key: 'arijit', label: 'Arijit Singh', query: 'arijit singh' },
    { key: 'tamil', label: 'Tamil', query: 'tamil' },
    { key: 'telugu', label: 'Telugu', query: 'telugu' },
    { key: 'sufi', label: 'Ghazal & Sufi', query: 'sufi' },
    { key: 'indie', label: 'Hindi Indie', query: 'prateek kuhad' },
    { key: 'garhwali', label: 'Garhwali', query: 'garhwali' }
];

// Official previews from iTunes first, then a few full-length matches from Audius
export const indianMix = (query, itunesLimit = 16, audiusLimit = 6) =>
    Promise.all([
        itunesSearch(query, itunesLimit),
        audiusSearch(query, audiusLimit).catch(() => [])
    ]).then(([previews, full]) => [...previews, ...full]);

// Audius track -> the app's song shape { id, name, artist, image, src, time, ... }
const fromAudius = (t) => ({
    id: 'au-' + t.id,
    name: t.title,
    artist: t.user ? t.user.name : 'Unknown artist',
    image: (t.artwork && (t.artwork['480x480'] || t.artwork['150x150'])) || '../images/m0.jpg',
    src: `${AUDIUS}/tracks/${t.id}/stream?app_name=${APP_NAME}`,
    time: formatTime(t.duration),
    source: 'audius',
    link: t.permalink ? 'https://audius.co' + t.permalink : '',
    plays: t.play_count || 0,
    released: t.release_date || t.created_at || '',
    artistFollowers: t.user ? t.user.follower_count : 0,
    artistCover: t.user && t.user.cover_photo ? (t.user.cover_photo['640x'] || t.user.cover_photo['2000x'] || '') : ''
});

// iTunes track -> song shape; plays the 30-second preview
const fromItunes = (t) => ({
    id: 'it-' + t.trackId,
    name: t.trackName,
    artist: t.artistName,
    image: (t.artworkUrl100 || '').replace('100x100bb', '600x600bb'),
    src: t.previewUrl,
    time: '00:30',
    fullTime: t.trackTimeMillis ? formatTime(t.trackTimeMillis / 1000) : '',
    album: t.collectionName || '',
    source: 'itunes',
    link: t.trackViewUrl || ''
});

// Same URL within 5 minutes -> same response, so pages share one request
const cache = new Map();
// <img onError={onCoverError}>: show a placeholder picture when an online cover fails to load
export const onCoverError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '../images/m0.jpg';
};

const getJson = (url) => {
    const hit = cache.get(url);
    if (hit && Date.now() - hit.time < 5 * 60 * 1000) {
        return hit.promise;
    }
    const promise = fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error('Server responded with ' + res.status);
        }
        return res.json();
    });
    promise.catch(() => cache.delete(url));
    cache.set(url, { promise, time: Date.now() });
    return promise;
};

const playable = (tracks, limit) => tracks.filter((t) => t.is_streamable !== false).slice(0, limit).map(fromAudius);

// Trending full songs; time: 'week' | 'month' | 'allTime'
export const audiusTrending = (genre, limit = 12, time = 'week') =>
    getJson(`${AUDIUS}/tracks/trending?app_name=${APP_NAME}&time=${time}${genre ? '&genre=' + encodeURIComponent(genre) : ''}`)
        .then((resp) => playable(resp.data, limit));

// Up-and-coming artists, newest uploads first
export const audiusNew = (limit = 8) =>
    getJson(`${AUDIUS}/tracks/trending/underground?app_name=${APP_NAME}`)
        .then((resp) => playable(resp.data, 40).sort((a, b) => new Date(b.released) - new Date(a.released)).slice(0, limit));

// Weekly chart: rank by this week's trending; trend compares with this month's position
export const audiusChart = (limit = 5) =>
    Promise.all([audiusTrending('', limit, 'week'), audiusTrending('', 100, 'month')]).then(([week, month]) =>
        week.map((song, i) => {
            const lastIndex = month.findIndex((m) => m.id === song.id);
            const rank = i + 1;
            const trend = lastIndex === -1 ? 'new' : lastIndex + 1 > rank ? 'up' : lastIndex + 1 < rank ? 'down' : 'same';
            return { ...song, rank, trend, lastWeek: lastIndex + 1 };
        }));

// One song by its app id ("au-…" / "it-…"); resolves to null if it no longer exists
export const lookupSong = (id) => {
    if (id.startsWith('au-')) {
        return fetch(`${AUDIUS}/tracks/${encodeURIComponent(id.slice(3))}?app_name=${APP_NAME}`)
            .then((res) => res.ok ? res.json().then((resp) => resp.data ? fromAudius(resp.data) : null) : null);
    }
    if (id.startsWith('it-')) {
        return fetch(`https://itunes.apple.com/lookup?id=${encodeURIComponent(id.slice(3))}&country=IN`)
            .then((res) => res.json())
            .then((resp) => {
                const t = resp.results.find((r) => r.previewUrl);
                return t ? fromItunes(t) : null;
            });
    }
    return Promise.resolve(null);
};

export const audiusSearch = (query, limit = 12) =>
    getJson(`${AUDIUS}/tracks/search?app_name=${APP_NAME}&query=${encodeURIComponent(query)}`)
        .then((resp) => playable(resp.data, limit));

export const itunesSearch = (query, limit = 12) =>
    getJson(`${ITUNES}?media=music&entity=song&country=IN&limit=${limit}&term=${encodeURIComponent(query)}`)
        .then((resp) => resp.results.filter((t) => t.previewUrl).map(fromItunes));

// { songs, status: 'idle' | 'loading' | 'ok' | 'error' } for a request; re-runs when "key" changes
export function useApiSongs(request, key) {
    const [state, setState] = useState({ songs: [], status: request ? 'loading' : 'idle' });

    useEffect(() => {
        if (!request) {
            setState({ songs: [], status: 'idle' });
            return;
        }
        let cancelled = false;
        setState((s) => ({ songs: s.songs, status: 'loading' }));
        request().then((songs) => {
            if (!cancelled) {
                setState({ songs, status: 'ok' });
            }
        }).catch(() => {
            if (!cancelled) {
                setState({ songs: [], status: 'error' });
            }
        });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return state;
}

// Shared "trending this week" list (Discover, friends' listening)
export const useTrending = () => useApiSongs(() => audiusTrending('', 12, 'week'), 'trending-week');
