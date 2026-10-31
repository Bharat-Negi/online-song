import { createContext, useContext, useEffect, useRef, useState } from 'react';

// One audio element for the whole app, so music keeps playing between pages
const PlayerContext = createContext(null);

// 75 -> "01:15"
export const formatTime = (seconds) => {
    if (!seconds || !isFinite(seconds)) {
        return '00:00';
    }
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

// Playback settings, kept in this browser: { volume: 0..1, autoplay: play the next song when one ends }
const SETTINGS_KEY = 'player-settings';
const defaultSettings = { volume: 0.8, autoplay: true };
const readSettings = () => {
    try {
        return { ...defaultSettings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY)) };
    } catch {
        return defaultSettings;
    }
};

// Shown in the player before any song has been chosen
const nothingPlaying = { id: null, name: 'Nothing playing', artist: 'pick a song to start', image: '', src: '' };

export function PlayerProvider({ children }) {
    const audioRef = useRef(null);
    if (audioRef.current === null) {
        audioRef.current = new Audio();
        audioRef.current.preload = 'none';
    }
    const audio = audioRef.current;

    const [queue, setQueue] = useState([]);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [settings, setSettings] = useState(readSettings);
    const [volume, setVolumeState] = useState(settings.volume);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    // Keep the latest values for the "ended" handler
    const stateRef = useRef({});
    stateRef.current = { queue, index, isShuffle, isRepeat, autoplay: settings.autoplay };

    const load = (list, newIndex, autoPlay) => {
        setQueue(list);
        setIndex(newIndex);
        setCurrentTime(0);
        setDuration(0);
        audio.src = list[newIndex].src;
        if (autoPlay) {
            audio.play().catch(() => setIsPlaying(false));
        }
    };

    const nextIndex = () => {
        const { queue, index, isShuffle } = stateRef.current;
        if (queue.length === 0) {
            return 0;
        }
        if (isShuffle && queue.length > 1) {
            let i = index;
            while (i === index) {
                i = Math.floor(Math.random() * queue.length);
            }
            return i;
        }
        return (index + 1) % queue.length;
    };

    useEffect(() => {
        audio.volume = readSettings().volume;
        const onTime = () => setCurrentTime(audio.currentTime);
        const onMeta = () => setDuration(audio.duration || 0);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => {
            if (stateRef.current.isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else if (stateRef.current.autoplay && stateRef.current.queue.length > 0) {
                load(stateRef.current.queue, nextIndex(), true);
            }
        };
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('loadedmetadata', onMeta);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        return () => {
            audio.pause();
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('loadedmetadata', onMeta);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const current = queue[index] || nothingPlaying;

    const togglePlay = () => {
        if (queue.length === 0) {
            return;
        }
        if (!audio.src) {
            load(queue, index, true);
        } else if (audio.paused) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            audio.pause();
        }
    };

    // Play/pause a song from a list; the list becomes the queue
    const toggleSong = (song, list = [song]) => {
        if (current && current.id === song.id && audio.src) {
            togglePlay();
            return;
        }
        const songIndex = list.findIndex((item) => item.id === song.id);
        if (songIndex !== -1) {
            load(list, songIndex, true);
        }
    };

    // Add to the end of the queue; returns false if it is already queued
    const addToQueue = (song) => {
        if (queue.some((item) => item.id === song.id)) {
            return false;
        }
        setQueue([...queue, song]);
        return true;
    };

    const isSongPlaying = (id) => isPlaying && current && current.id === id;

    const next = () => {
        if (queue.length > 0) {
            load(queue, nextIndex(), true);
        }
    };

    const prev = () => {
        if (queue.length === 0) {
            return;
        }
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            load(queue, (index - 1 + queue.length) % queue.length, true);
        }
    };

    const seek = (fraction) => {
        if (duration) {
            audio.currentTime = fraction * duration;
            setCurrentTime(audio.currentTime);
        }
    };

    const setVolume = (value) => {
        audio.volume = value;
        audio.muted = false;
        setVolumeState(value);
        setIsMuted(false);
    };

    const toggleMute = () => {
        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const value = {
        playlist: queue,
        current,
        // false until a song has been started at least once
        hasSong: Boolean(audio.src),
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        isRepeat,
        togglePlay,
        toggleSong,
        isSongPlaying,
        addToQueue,
        pause: () => audio.pause(),
        playIndex: (i) => load(queue, i, true),
        next,
        prev,
        seek,
        setVolume,
        toggleMute,
        toggleShuffle: () => setIsShuffle(!isShuffle),
        toggleRepeat: () => setIsRepeat(!isRepeat),
        settings,
        // Save playback settings; a new default volume is applied straight away
        updateSettings: (change) => {
            const next = { ...settings, ...change };
            setSettings(next);
            try {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            } catch {
                // storage blocked: the setting still applies until the page is reloaded
            }
            if (change.volume !== undefined) {
                setVolume(change.volume);
            }
        }
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
    return useContext(PlayerContext);
}
