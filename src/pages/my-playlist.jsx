import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import JsPlayer from '../common-pages/jsPlayer';
import { usePlayer } from '../common-pages/playerContext';
import { useLibrary } from '../common-pages/libraryContext';
import { audiusSearch, audiusTrending, itunesSearch, useApiSongs } from '../common-pages/musicApi';

// "05:25" -> 325
const toSeconds = (time) => {
    const [m, s] = time.split(':').map(Number);
    return m * 60 + s;
};

// Shows "My Playlist" (/my-playlist) or a custom playlist (/playlist/:id)
export default function PlaylistPage() {
    const { id } = useParams();
    const player = usePlayer();
    const library = useLibrary();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [search, setSearch] = useState('');
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState('');

    const custom = id ? library.getPlaylist(id) : null;
    const isMine = !id;
    const name = isMine ? 'My Playlist' : custom && custom.name;
    const songIds = isMine ? library.playlist : custom ? custom.songs : [];

    const hasSong = (songId) => songIds.includes(songId);
    const toggleSong = (songId) => isMine ? library.togglePlaylist(songId) : library.toggleSongInPlaylist(id, songId);

    // Saved songs in the order they were added
    const songs = songIds.map(library.findSong).filter(Boolean);

    const totalSeconds = songs.reduce((sum, song) => sum + toSeconds(song.time), 0);
    const totalTime = `${Math.floor(totalSeconds / 60)} min`;
    const isPlaylistPlaying = player.isPlaying && songs.some((song) => song.id === player.current.id);

    // "Add songs": search Audius (full songs) and iTunes (previews); trending when the box is empty.
    // The search waits until typing pauses for 400 ms.
    const [query, setQuery] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => setQuery(search.trim()), 400);
        return () => clearTimeout(timer);
    }, [search]);
    const found = useApiSongs(isAdding
        ? (query
            ? () => Promise.all([audiusSearch(query, 8), itunesSearch(query, 8).catch(() => [])]).then(([a, b]) => [...a, ...b])
            : () => audiusTrending('', 12))
        : null, (isAdding ? 'on' : 'off') + ':' + query);
    const searchResults = found.songs;

    // A custom playlist that does not exist (deleted, or library still loading)
    if (id && !custom) {
        return library.isLoaded ? <Navigate to="/my-playlist" replace /> : null;
    }

    // Pause if this playlist is playing, otherwise start from the first song
    const playAll = () => {
        const playing = isPlaylistPlaying && songs.find((song) => song.id === player.current.id);
        player.toggleSong(playing || songs[0], songs);
    };

    const remove = (song) => {
        toggleSong(song.id);
        toast.info(`Removed "${song.name}" from ${name}`);
    };

    const addOrRemove = (song) => {
        library.rememberSong(song);
        const added = toggleSong(song.id);
        toast.info(added ? `Added "${song.name}" to ${name}` : `Removed "${song.name}" from ${name}`);
    };

    const toggleHeart = (song) => {
        const added = library.toggleFavourite(song.id);
        toast.info(added ? `Added "${song.name}" to favourites` : `Removed "${song.name}" from favourites`);
    };

    const startRename = () => {
        setNewName(name);
        setIsRenaming(true);
    };

    const saveRename = (e) => {
        e.preventDefault();
        const trimmed = newName.trim();
        if (trimmed === '') {
            toast.warning('Please enter a playlist name');
            return;
        }
        if (trimmed === name) {
            setIsRenaming(false);
            return;
        }
        if (library.playlists.some((pl) => pl.id !== id && pl.name.toLowerCase() === trimmed.toLowerCase())) {
            toast.warning(`You already have a playlist called "${trimmed}"`);
            return;
        }
        library.renamePlaylist(id, trimmed);
        setIsRenaming(false);
        toast.success('Playlist renamed');
    };

    const deletePlaylist = () => {
        if (window.confirm(`Delete the playlist "${name}"?`)) {
            library.deletePlaylist(id);
            toast.info(`Deleted "${name}"`);
            navigate('/my-playlist');
        }
    };

    // Shuffle on, then start from a random song
    const shufflePlay = () => {
        if (!player.isShuffle) {
            player.toggleShuffle();
        }
        player.toggleSong(songs[Math.floor(Math.random() * songs.length)], songs);
    };

    const owner = sessionStorage.getItem('username') || '';
    // Up to four covers for the header collage
    const covers = [...new Set(songs.map((song) => song.image))].slice(0, 4);

    return (
        <section className="vbox">
            <section className="scrollable w-f-md">
                <div className="pl-hero">
                    {covers.length > 0 && <div className="pl-hero-bg" style={{ backgroundImage: `url(${covers[0]})` }}></div>}
                    <div className="pl-hero-inner">
                        <div className={covers.length >= 4 ? "pl-cover pl-cover-grid" : "pl-cover"}>
                            {covers.length === 0 && <i className={isMine ? "icon-heart" : "icon-playlist"}></i>}
                            {covers.length > 0 && covers.length < 4 && <img src={covers[0]} alt="" />}
                            {covers.length >= 4 && covers.map((src) => <img key={src} src={src} alt="" />)}
                        </div>
                        <div className="pl-info">
                            <span className="pl-type">{isMine ? 'Your playlist' : 'Playlist'}</span>
                            {isRenaming ? (
                                <form className="pl-rename" onSubmit={saveRename}>
                                    <div className="pl-rename-field">
                                        <i className="icon-pencil"></i>
                                        <input type="text" value={newName} autoFocus maxLength={40} aria-label="Playlist name"
                                            placeholder="Playlist name" onFocus={(e) => e.target.select()}
                                            onChange={e => setNewName(e.target.value)}
                                            onKeyDown={e => { if (e.key === 'Escape') setIsRenaming(false); }} />
                                        <button type="submit" className="pl-rename-btn save" title="Save (Enter)"
                                            disabled={newName.trim() === '' || newName.trim() === name}>
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button type="button" className="pl-rename-btn" title="Cancel (Esc)" onClick={() => setIsRenaming(false)}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="pl-rename-hint">
                                        <span><kbd>Enter</kbd> to save · <kbd>Esc</kbd> to cancel</span>
                                        <span>{newName.length}/40</span>
                                    </div>
                                </form>
                            ) : (
                                <h1 className="pl-title">{name}</h1>
                            )}
                            <div className="pl-meta">
                                <strong className="text-capitalize">{owner}</strong>
                                <span> · {songs.length} song{songs.length === 1 ? '' : 's'}</span>
                                {songs.length > 0 && <span> · {totalTime}</span>}
                            </div>
                            <div className="pl-actions">
                                {songs.length > 0 && (
                                    <>
                                        <button className="pl-play" onClick={playAll} title={isPlaylistPlaying ? 'Pause' : 'Play all'}>
                                            <i className={isPlaylistPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                                        </button>
                                        <button className={player.isShuffle ? "pl-icon-btn active" : "pl-icon-btn"} onClick={shufflePlay} title="Shuffle play">
                                            <i className="icon-shuffle"></i>
                                        </button>
                                    </>
                                )}
                                <button className={isAdding ? "pl-icon-btn active" : "pl-icon-btn"} onClick={() => setIsAdding(!isAdding)} title={isAdding ? 'Done adding' : 'Add songs'}>
                                    <i className={isAdding ? "icon-check" : "icon-plus"}></i>
                                </button>
                                {!isMine && !isRenaming && (
                                    <>
                                        <button className="pl-icon-btn" onClick={startRename} title="Rename playlist">
                                            <i className="icon-pencil"></i>
                                        </button>
                                        <button className="pl-icon-btn" onClick={deletePlaylist} title="Delete playlist">
                                            <i className="icon-trash"></i>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="padder-lg">
                    {isAdding && (
                        <div className="pl-add animated fadeInDown">
                            <div className="pl-add-head">
                                <i className="fa fa-search text-muted"></i>
                                <input type="text" className="form-control no-border" placeholder="Search songs or artists to add" autoFocus
                                    value={search} onChange={e => setSearch(e.target.value)} />
                                <button className="btn btn-sm btn-default btn-rounded" onClick={() => setIsAdding(false)}>Done</button>
                            </div>
                            <ul className="list-unstyled add-songs-list">
                                {found.status === 'loading' && <li className="pl-add-row text-muted">Searching…</li>}
                                {found.status === 'error' && <li className="pl-add-row text-muted">Could not search right now. Check your internet connection.</li>}
                                {found.status === 'ok' && searchResults.length === 0 && <li className="pl-add-row text-muted">No songs found</li>}
                                {searchResults.map((song) => (
                                    <li className="pl-add-row" key={song.id}>
                                        <img src={song.image} alt={song.name} className="pl-thumb" />
                                        <span className="pl-add-name text-ellipsis">
                                            {song.name} <small className="text-muted">· {song.artist}{song.source === 'itunes' ? ' · 30s preview' : ''}</small>
                                        </span>
                                        <span className="text-muted hidden-xs m-r">{song.time}</span>
                                        <button className={hasSong(song.id) ? "btn btn-sm btn-info btn-rounded" : "btn btn-sm btn-default btn-rounded"} onClick={() => addOrRemove(song)}>
                                            {hasSong(song.id) ? <><i className="fa fa-check"></i> Added</> : <><i className="icon-plus"></i> Add</>}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {songs.length === 0 ? (
                        <div className="pl-empty">
                            <i className="icon-music-tone-alt"></i>
                            <h4>This playlist is empty</h4>
                            <p className="text-muted">
                                Use <strong>+</strong> above to add songs{isMine && <>, or the <i className="fa fa-plus-circle"></i> button on any song card</>}.
                            </p>
                            <button className="btn btn-info btn-rounded m-r-xs" onClick={() => setIsAdding(true)}><i className="icon-plus m-r-xs"></i>Add songs</button>
                            <Link to="/" className="btn btn-default btn-rounded">Discover songs</Link>
                        </div>
                    ) : (
                        <div className="pl-tracks">
                            <div className="pl-row pl-head">
                                <span className="pl-num">#</span>
                                <span className="pl-title-col">Title</span>
                                <span className="pl-time"><i className="icon-clock"></i></span>
                                <span className="pl-tools"></span>
                            </div>
                            {songs.map((song, i) => {
                                const isPlaying = player.isSongPlaying(song.id);
                                const isCurrent = player.current.id === song.id;
                                const isFav = library.isFavourite(song.id);
                                return (
                                    <div className={isCurrent ? "pl-row pl-current" : "pl-row"} key={song.id}
                                        onDoubleClick={() => player.toggleSong(song, songs)}>
                                        <span className="pl-num">
                                            {isPlaying ? (
                                                <span className="musicbar animate pl-bars">
                                                    <span className="bar1 a1 bg-info"></span>
                                                    <span className="bar2 a2 bg-info"></span>
                                                    <span className="bar3 a3 bg-info"></span>
                                                    <span className="bar4 a4 bg-info"></span>
                                                    <span className="bar5 a5 bg-info"></span>
                                                </span>
                                            ) : (
                                                <span className="pl-index">{i + 1}</span>
                                            )}
                                            <a className="pl-row-play" title={isPlaying ? 'Pause' : 'Play'} onClick={() => player.toggleSong(song, songs)}>
                                                <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                                            </a>
                                        </span>
                                        <span className="pl-title-col">
                                            <img src={song.image} alt={song.name} className="pl-thumb" />
                                            <span className="pl-names">
                                                <a className="pl-song text-ellipsis" onClick={() => player.toggleSong(song, songs)}>{song.name}</a>
                                                <small className="text-muted text-ellipsis">{song.artist}</small>
                                            </span>
                                        </span>
                                        <span className="pl-time text-muted">{song.time}</span>
                                        <span className="pl-tools">
                                            <a className={isFav ? "pl-tool pl-fav" : "pl-tool"} title={isFav ? 'Remove from favourites' : 'Add to favourites'} onClick={() => toggleHeart(song)}>
                                                <i className={isFav ? "fa fa-heart" : "fa fa-heart-o"}></i>
                                            </a>
                                            <a className="pl-tool" title={`Remove from ${name}`} onClick={() => remove(song)}>
                                                <i className="icon-close"></i>
                                            </a>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <JsPlayer />
        </section>
    )
}
