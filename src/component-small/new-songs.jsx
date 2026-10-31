import { useState } from 'react'
import { usePlayer } from '../common-pages/playerContext'
import { audiusNew, useApiSongs, onCoverError } from '../common-pages/musicApi'
import AddBtnPage from './addBtn'
import BookmarkButton from './bookmark'

// Release date -> "Today", "3d", "2w"
const releasedLabel = (date) => {
    if (!date) {
        return 'New';
    }
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days <= 0) {
        return 'Today';
    }
    return days < 7 ? `${days}d` : `${Math.floor(days / 7)}w`;
};

export default function NewSongs() {
    const player = usePlayer();
    // Newest uploads from up-and-coming artists on Audius
    const state = useApiSongs(() => audiusNew(8), 'new-songs');
    const newSongs = state.songs;
    // Card whose "add to playlist" menu is open, so its controls stay visible
    const [menuCardId, setMenuCardId] = useState(null);
    const isListPlaying = player.isPlaying && newSongs.some((song) => song.id === player.current.id);

    // Pause if a new song is playing, otherwise play the list from the first song
    const playAll = () => {
        if (newSongs.length === 0) {
            return;
        }
        const playing = isListPlaying && newSongs.find((song) => song.id === player.current.id);
        player.toggleSong(playing || newSongs[0], newSongs);
    };

    return (
        <div className="col-md-7">
            <div className="tc-head">
                <h3 className="font-thin">New Songs</h3>
                <span className="tc-week">Fresh releases</span>
                <button className="tc-play-all" onClick={playAll} title={isListPlaying ? 'Pause' : 'Play all new songs'}>
                    <i className={isListPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                </button>
            </div>
            <div className="ns-panel">
                {state.status === 'error' && <p className="text-muted m-b-none">Could not load new songs. Check your internet connection.</p>}
                <div className="ns-grid">
                    {state.status === 'loading' && newSongs.length === 0 && Array.from({ length: 8 }, (_, i) => (
                        <div className="song-skeleton m-b-none" key={i}><span></span><i></i><b></b></div>
                    ))}
                    {newSongs.map((song) => {
                        const isPlaying = player.isSongPlaying(song.id);
                        const isCurrent = player.current.id === song.id;
                        const progress = isCurrent && player.duration ? (player.currentTime / player.duration) * 100 : 0;
                        let cardClass = 'ns-card';
                        if (isCurrent) cardClass += ' ns-current';
                        if (menuCardId === song.id) cardClass += ' ns-menu-open';
                        return (
                            <div className={cardClass} key={song.id}>
                                <div className="ns-cover">
                                    <img src={song.image} alt={song.name} className="cover-loading" loading="lazy" onError={onCoverError} />
                                    <span className="ns-badge">New · {releasedLabel(song.released)}</span>
                                    <BookmarkButton song={song} />
                                    <span className="ns-time">{song.time}</span>
                                    <div className="ns-overlay">
                                        <button className="ns-play" onClick={() => player.toggleSong(song, newSongs)} title={isPlaying ? 'Pause' : 'Play'}>
                                            {isPlaying ? (
                                                <span className="musicbar animate ns-bars">
                                                    <span className="bar1 a1 bg-white"></span>
                                                    <span className="bar2 a2 bg-white"></span>
                                                    <span className="bar3 a3 bg-white"></span>
                                                    <span className="bar4 a4 bg-white"></span>
                                                    <span className="bar5 a5 bg-white"></span>
                                                </span>
                                            ) : (
                                                <i className="fa fa-play"></i>
                                            )}
                                        </button>
                                        <AddBtnPage song={song} onMenuChange={(open) => setMenuCardId(open ? song.id : null)} />
                                    </div>
                                    {isCurrent && <span className="ns-progress" style={{ width: progress + '%' }}></span>}
                                </div>
                                <a className="ns-name text-ellipsis" onClick={() => player.toggleSong(song, newSongs)}>{song.name}</a>
                                <span className="ns-artist text-ellipsis">{song.artist}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
