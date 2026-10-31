import { useState } from 'react';
import { Link } from 'react-router-dom';
import JsPlayer from '../common-pages/jsPlayer';
import { usePlayer } from '../common-pages/playerContext';
import { useLibrary } from '../common-pages/libraryContext';
import { SongCard } from '../component-small/song-card';

// /bookmarks: every song the user bookmarked, newest bookmark first
export default function BookmarksPage() {
    const player = usePlayer();
    const library = useLibrary();
    const [search, setSearch] = useState('');
    const [menuCardId, setMenuCardId] = useState(null);

    const all = [...library.bookmarks].reverse().map(library.findSong).filter(Boolean);
    const query = search.trim().toLowerCase();
    const songs = all.filter((s) => s.name.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query));
    const isPlaying = player.isPlaying && all.some((s) => s.id === player.current.id);

    // Pause if a bookmarked song is playing, otherwise play them all from the first
    const playAll = () => {
        if (all.length === 0) {
            return;
        }
        const playing = isPlaying && all.find((s) => s.id === player.current.id);
        player.toggleSong(playing || all[0], all);
    };

    const clearAll = () => {
        if (window.confirm(`Remove all ${all.length} bookmarks?`)) {
            library.bookmarks.forEach((id) => library.toggleBookmark(id));
        }
    };

    return (
        <section className="vbox">
            <section className="scrollable padder-lg w-f-md">
                <div className="clearfix m-t-lg m-b">
                    {all.length > 0 && (
                        <div className="pull-right">
                            <input type="text" className="form-control input-s rounded inline m-r-xs" placeholder="Search bookmarks..."
                                value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-default btn-rounded m-r-xs" onClick={clearAll} title="Remove all bookmarks">
                                <i className="icon-trash"></i>
                            </button>
                            <button className="btn btn-info btn-rounded" onClick={playAll}>
                                <i className={isPlaying ? "icon-control-pause m-r-xs" : "icon-control-play m-r-xs"}></i>
                                {isPlaying ? 'Pause' : 'Play all'}
                            </button>
                        </div>
                    )}
                    <h2 className="font-thin m-b-xs"><i className="fa fa-bookmark text-info m-r-sm"></i>Bookmarks</h2>
                    <span className="text-muted">{all.length} song{all.length === 1 ? '' : 's'} saved for later</span>
                </div>

                {all.length === 0 ? (
                    <div className="pl-empty">
                        <i className="fa fa-bookmark-o"></i>
                        <h4>No bookmarks yet</h4>
                        <p className="text-muted">Tap <i className="fa fa-bookmark-o"></i> on any song cover to save it here for later.</p>
                        <Link to="/" className="btn btn-info btn-rounded m-r-xs">Discover songs</Link>
                        <Link to="/search" className="btn btn-default btn-rounded">Search</Link>
                    </div>
                ) : (
                    <div className="row row-sm card-grid">
                        {songs.length === 0 && <div className="col-xs-12 text-muted m-b">No bookmarks match your search.</div>}
                        {songs.map((song) => (
                            <SongCard key={song.id} song={song} queue={all}
                                menuOpen={menuCardId === song.id} onMenuChange={(open) => setMenuCardId(open ? song.id : null)} />
                        ))}
                    </div>
                )}
            </section>
            <JsPlayer />
        </section>
    );
}
