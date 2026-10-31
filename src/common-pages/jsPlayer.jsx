import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePlayer, formatTime } from './playerContext';
import { useLibrary } from './libraryContext';
import { onCoverError } from './musicApi';

// Pointer position inside an element as 0..1
const fractionAt = (el, clientX) => {
    const rect = el.getBoundingClientRect();
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
};

// Footer player: song info (left), transport controls (centre), time / queue / volume (right),
// and a seek bar along the top edge
export default function JsPlayer() {
    const player = usePlayer();
    const library = useLibrary();
    const [isList, setIsList] = useState(false);
    const [dragAt, setDragAt] = useState(null);   // 0..1 while dragging the seek bar
    const listRef = useRef(null);
    const seekRef = useRef(null);

    const song = player.current;
    const hasSong = Boolean(song.id);
    const isFav = hasSong && library.isFavourite(song.id);
    const progress = dragAt !== null ? dragAt * 100 : (player.duration ? (player.currentTime / player.duration) * 100 : 0);
    const shownTime = dragAt !== null ? dragAt * player.duration : player.currentTime;
    const volume = player.isMuted ? 0 : player.volume;

    // Close the queue when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setIsList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Click or drag on the seek bar
    const startSeek = (e) => {
        if (!player.duration) {
            return;
        }
        const el = seekRef.current;
        setDragAt(fractionAt(el, e.clientX));
        const move = (ev) => setDragAt(fractionAt(el, ev.clientX));
        const up = (ev) => {
            player.seek(fractionAt(el, ev.clientX));
            setDragAt(null);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };

    const toggleFav = () => {
        library.rememberSong(song);
        const added = library.toggleFavourite(song.id);
        toast.info(added ? `Added "${song.name}" to favourites` : `Removed "${song.name}" from favourites`);
    };

    const volumeIcon = volume === 0 ? 'icon-volume-off' : volume < 0.5 ? 'icon-volume-1' : 'icon-volume-2';

    return (
        <footer className="footer mp" ref={listRef}>
            <div className={hasSong ? 'mp-seek' : 'mp-seek disabled'} ref={seekRef} onPointerDown={startSeek}
                title={hasSong ? 'Seek' : ''} role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={Math.round(player.duration)} aria-valuenow={Math.round(shownTime)}>
                <span className="mp-seek-fill" style={{ width: progress + '%' }}>
                    <span className="mp-seek-knob"></span>
                </span>
            </div>

            <div className="mp-row">
                <div className="mp-song">
                    {hasSong
                        ? <img src={song.image} alt="" className="mp-cover" onError={onCoverError} />
                        : <span className="mp-cover mp-cover-empty"><i className="icon-music-tone-alt"></i></span>}
                    <span className="mp-text">
                        <strong className="text-ellipsis" title={song.name}>{song.name}</strong>
                        <small className="text-ellipsis">{hasSong ? song.artist : 'Pick a song to start listening'}</small>
                    </span>
                    {hasSong && (
                        <button className={isFav ? 'mp-btn mp-fav on' : 'mp-btn mp-fav'} onClick={toggleFav} title={isFav ? 'Remove from favourites' : 'Add to favourites'}>
                            <i className={isFav ? 'fa fa-heart' : 'fa fa-heart-o'}></i>
                        </button>
                    )}
                </div>

                <div className="mp-controls">
                    <button className={player.isShuffle ? 'mp-btn mp-hide-sm on' : 'mp-btn mp-hide-sm'} onClick={player.toggleShuffle} title={player.isShuffle ? 'Shuffle on' : 'Shuffle off'}>
                        <i className="icon-shuffle"></i>
                    </button>
                    <button className="mp-btn" onClick={player.prev} title="Previous" disabled={!hasSong}><i className="fa fa-step-backward"></i></button>
                    <button className="mp-play" onClick={player.togglePlay} title={player.isPlaying ? 'Pause' : 'Play'} disabled={!hasSong}>
                        <i className={player.isPlaying ? 'fa fa-pause' : 'fa fa-play'}></i>
                    </button>
                    <button className="mp-btn" onClick={player.next} title="Next" disabled={!hasSong}><i className="fa fa-step-forward"></i></button>
                    <button className={player.isRepeat ? 'mp-btn mp-hide-sm on' : 'mp-btn mp-hide-sm'} onClick={player.toggleRepeat} title={player.isRepeat ? 'Repeat on' : 'Repeat off'}>
                        <i className="icon-loop"></i>
                    </button>
                </div>

                <div className="mp-extra">
                    <span className="mp-time">{formatTime(shownTime)} / {formatTime(player.duration)}</span>
                    {song.source === 'itunes' && <span className="mp-tag" title="iTunes only allows 30-second previews">30s preview</span>}
                    <button className={isList ? 'mp-btn on' : 'mp-btn'} onClick={() => setIsList(!isList)} title="Play queue">
                        <i className="icon-list"></i>
                    </button>
                    <span className="mp-volume mp-hide-sm">
                        <button className="mp-btn" onClick={player.toggleMute} title={player.isMuted ? 'Unmute' : 'Mute'}>
                            <i className={volumeIcon}></i>
                        </button>
                        <input type="range" min="0" max="1" step="0.01" value={volume} aria-label="Volume"
                            style={{ '--fill': volume * 100 + '%' }}
                            onChange={(e) => player.setVolume(Number(e.target.value))} />
                    </span>
                </div>
            </div>

            {isList && (
                <div className="mp-queue">
                    <div className="mp-queue-head">
                        <strong>Play queue</strong>
                        <small>{player.playlist.length} song{player.playlist.length === 1 ? '' : 's'}</small>
                    </div>
                    {player.playlist.length === 0 && <p className="mp-queue-empty">The queue is empty. Play a song to start.</p>}
                    <ul>
                        {player.playlist.map((item, i) => (
                            <li key={item.id} className={item.id === song.id ? 'current' : ''} onClick={() => { player.playIndex(i); setIsList(false); }}>
                                <img src={item.image} alt="" onError={onCoverError} />
                                <span className="mp-text">
                                    <strong className="text-ellipsis">{item.name}</strong>
                                    <small className="text-ellipsis">{item.artist}</small>
                                </span>
                                {item.id === song.id && player.isPlaying
                                    ? <span className="musicbar animate mp-bars"><span className="bar1 a1 bg-info"></span><span className="bar2 a2 bg-info"></span><span className="bar3 a3 bg-info"></span><span className="bar4 a4 bg-info"></span></span>
                                    : <small className="mp-queue-time">{item.time}</small>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </footer>
    )
}
