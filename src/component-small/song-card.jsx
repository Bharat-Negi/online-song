import { useState } from 'react';
import AddBtnPage from './addBtn';
import PlayPause from './play-pause';
import { usePlayer, formatTime } from '../common-pages/playerContext';
import { onCoverError } from '../common-pages/musicApi';
import BookmarkButton from './bookmark';

const sourceBadge = { audius: 'Audius', itunes: '30s preview' };

// Song card: cover, play/pause, live time, add to playlist, favourite. "queue" is what plays next.
export function SongCard({ song, queue, menuOpen, onMenuChange }) {
    const player = usePlayer();
    const isPlaying = player.isSongPlaying(song.id);
    return (
        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
            <div className="item">
                <div className="pos-rlt">
                    {sourceBadge[song.source] && (
                        <div className="top">
                            <span className={`badge m-l-sm m-t-sm source-badge source-${song.source}`}>{sourceBadge[song.source]}</span>
                        </div>
                    )}
                    {isPlaying && (
                        <div className="bottom play-time">
                            <span className="badge bg-info m-l-sm m-b-sm">
                                {formatTime(player.currentTime)} / {player.duration ? formatTime(player.duration) : song.time}
                            </span>
                        </div>
                    )}
                    <BookmarkButton song={song} />
                    <div className={menuOpen ? "item-overlay opacity r r-2x bg-black active" : "item-overlay opacity r r-2x bg-black"}>
                        <PlayPause isPlay={isPlaying} onToggle={() => player.toggleSong(song, queue)} />
                        <AddBtnPage song={song} onMenuChange={onMenuChange} />
                    </div>
                    <a className="cus-hand" onClick={() => player.toggleSong(song, queue)}>
                        <img src={song.image} alt={song.name} className="r r-2x img-full square-thumb cover-loading" loading="lazy"
                            onError={onCoverError} />
                    </a>
                </div>
                <div className="padder-v">
                    <a className={player.current.id === song.id ? "text-ellipsis cus-hand text-info" : "text-ellipsis cus-hand"}
                        onClick={() => player.toggleSong(song, queue)} title={song.name}>{song.name}</a>
                    <span className="card-meta text-xs text-muted">
                        <span className="text-ellipsis">
                        {song.link
                            ? <a href={song.link} target="_blank" rel="noreferrer" className="text-muted" title={song.source === 'itunes' ? 'Open in Apple Music' : 'Open on Audius'}>{song.artist}</a>
                            : song.artist}
                        </span>
                        <span title={song.fullTime ? `Full song ${song.fullTime}` : 'Length'}>{song.fullTime || song.time}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// A titled grid of songs from an API, with loading / error / empty states
export function SongSection({ title, note, state, emptyText, actions }) {
    const player = usePlayer();
    const [menuCardId, setMenuCardId] = useState(null);
    const isPlaying = player.isPlaying && state.songs.some((s) => s.id === player.current.id);

    const playAll = () => {
        const playing = isPlaying && state.songs.find((s) => s.id === player.current.id);
        player.toggleSong(playing || state.songs[0], state.songs);
    };

    return (
        <div className="song-section m-b-lg">
            <div className="song-section-head">
                <h3 className="font-thin m-t-none m-b-none">{title}</h3>
                {note && <span className="tc-week">{note}</span>}
                {actions}
                {state.status === 'ok' && state.songs.length > 0 && (
                    <button className="tc-play-all" onClick={playAll} title={isPlaying ? 'Pause' : 'Play all'}>
                        <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                    </button>
                )}
            </div>
            {state.status === 'loading' && (
                <div className="row row-sm card-grid">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={i}>
                            <div className="song-skeleton"><span></span><i></i><b></b></div>
                        </div>
                    ))}
                </div>
            )}
            {state.status === 'error' && (
                <p className="text-muted"><i className="fa fa-exclamation-circle m-r-xs"></i>Could not load songs. Check your internet connection and try again.</p>
            )}
            {state.status === 'ok' && state.songs.length === 0 && <p className="text-muted">{emptyText || 'No songs found.'}</p>}
            {state.status === 'ok' && state.songs.length > 0 && (
                <div className="row row-sm card-grid">
                    {state.songs.map((song) => (
                        <SongCard key={song.id} song={song} queue={state.songs}
                            menuOpen={menuCardId === song.id} onMenuChange={(open) => setMenuCardId(open ? song.id : null)} />
                    ))}
                </div>
            )}
        </div>
    );
}
