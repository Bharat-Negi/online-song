import { useEffect, useRef, useState } from 'react';
import '../css/jplayer.flat.css'
import { usePlayer, formatTime } from './playerContext';

// Click position inside a bar as 0..1
const barFraction = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
};

export default function JsPlayer() {
    const player = usePlayer();
    const [isList, setIsList] = useState(false);
    const listRef = useRef(null);

    // Close the playlist when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setIsList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const progress = player.duration ? (player.currentTime / player.duration) * 100 : 0;
    const volume = player.isMuted ? 0 : player.volume * 100;

    return (
        <footer className="footer bg-dark">
            <div id="jp_container_N" ref={listRef}>
                <div className="jp-type-playlist">
                    <div className="jp-gui">
                        <div className="jp-interface">
                            <div className="jp-controls">
                                <div><a className="jp-previous" title="previous" onClick={player.prev}><i className="icon-control-rewind i-lg"></i></a></div>
                                <div>
                                    <a className={player.isPlaying ? "jp-play hid" : "jp-play"} title="play" onClick={player.togglePlay}><i className="icon-control-play i-2x"></i></a>
                                    <a className={player.isPlaying ? "jp-pause" : "jp-pause hid"} title="pause" onClick={player.togglePlay}><i className="icon-control-pause i-2x"></i></a>
                                </div>
                                <div><a className="jp-next" title="next" onClick={player.next}><i className="icon-control-forward i-lg"></i></a></div>
                                <div><a title="playlist" onClick={() => setIsList(!isList)}><i className={isList ? "icon-list text-lt" : "icon-list"}></i></a></div>
                                <div className="jp-progress hidden-xs">
                                    <div className="jp-seek-bar dk" style={{width: '100%'}} onClick={(e) => player.seek(barFraction(e))}>
                                        <div className="jp-play-bar bg-info" style={{width: progress + '%'}}>
                                        </div>
                                        <div className="jp-title text-lt">
                                            <ul>
                                                <li>{player.current.name} <span className="jp-artist">by {player.current.artist}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden-xs hidden-sm jp-current-time text-xs text-muted">{formatTime(player.currentTime)}</div>
                                <div className="hidden-xs hidden-sm jp-duration text-xs text-muted">{formatTime(player.duration)}</div>
                                <div className="hidden-xs hidden-sm">
                                    <a className={player.isMuted ? "jp-mute hid" : "jp-mute"} title="mute" onClick={player.toggleMute}><i className="icon-volume-2"></i></a>
                                    <a className={player.isMuted ? "jp-unmute" : "jp-unmute hid"} title="unmute" onClick={player.toggleMute}><i className="icon-volume-off"></i></a>
                                </div>
                                <div className="hidden-xs hidden-sm jp-volume">
                                    <div className="jp-volume-bar dk" onClick={(e) => player.setVolume(barFraction(e))}>
                                        <div className="jp-volume-bar-value lter" style={{width: volume + '%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <a className={player.isShuffle ? "jp-shuffle hid" : "jp-shuffle"} title="shuffle" onClick={player.toggleShuffle}><i className="icon-shuffle text-muted"></i></a>
                                    <a className={player.isShuffle ? "jp-shuffle-off" : "jp-shuffle-off hid"} title="shuffle off" onClick={player.toggleShuffle}><i className="icon-shuffle text-lt"></i></a>
                                </div>
                                <div>
                                    <a className={player.isRepeat ? "jp-repeat hid" : "jp-repeat"} title="repeat" onClick={player.toggleRepeat}><i className="icon-loop text-muted"></i></a>
                                    <a className={player.isRepeat ? "jp-repeat-off" : "jp-repeat-off hid"} title="repeat off" onClick={player.toggleRepeat}><i className="icon-loop text-lt"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={isList ? "jp-playlist dropup open" : "jp-playlist dropup"} id="playlist">
                        <ul className="dropdown-menu aside-xl dker">
                            {player.playlist.map((song, i) => (
                                <li key={song.id} className="list-group-item">
                                    <a className={song.id === player.current.id ? "jp-playlist-item jp-playlist-current" : "jp-playlist-item"}
                                        onClick={() => { player.playIndex(i); setIsList(false); }}>
                                        {song.name} <span className="jp-artist">by {song.artist}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
