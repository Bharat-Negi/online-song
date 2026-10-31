import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import GenresData from '../json-data/genres.json';
import { SongCard } from '../component-small/song-card';
import { usePlayer } from '../common-pages/playerContext';
import { audiusGenreFor, audiusTrending, indianMix, useApiSongs } from '../common-pages/musicApi';

const PAGE_SIZE = 12;

// Song id -> genre slug it was listed under, so the genre list can mark what is playing
export const genreOfSong = new Map();

// One genre at /genres/:genre: this week's trending full songs for it on Audius,
// or for Indian genres a search (official iTunes previews + full Audius tracks)
export default function GenrePage() {
    const { genre: slug } = useParams();
    const player = usePlayer();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    // Card whose "add to playlist" menu is open, so its overlay stays visible
    const [menuCardId, setMenuCardId] = useState(null);

    const genre = GenresData.find((g) => g.slug === slug);
    const audiusGenre = audiusGenreFor(slug);
    const request = genre && genre.query
        ? () => indianMix(genre.query, 18, 6)
        : audiusGenre ? () => audiusTrending(audiusGenre, 24) : null;
    const state = useApiSongs(request, slug);

    // Start fresh when switching genre
    useEffect(() => {
        setSearch('');
        setPage(1);
    }, [slug]);

    useEffect(() => {
        state.songs.forEach((song) => genreOfSong.set(song.id, slug));
    }, [state.songs, slug]);

    if (!genre) {
        return <Navigate to="/genres" replace />;
    }

    const query = search.trim().toLowerCase();
    const songs = state.songs.filter((song) =>
        song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    const pageCount = Math.max(1, Math.ceil(songs.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pageSongs = songs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const isGenrePlaying = player.isPlaying && state.songs.some((song) => song.id === player.current.id);

    // Pause if this genre is playing, otherwise play it from the first song
    const playAll = () => {
        if (state.songs.length === 0) {
            return;
        }
        const playing = isGenrePlaying && state.songs.find((song) => song.id === player.current.id);
        player.toggleSong(playing || state.songs[0], state.songs);
    };

    const goTo = (e, n) => {
        e.preventDefault();
        if (n >= 1 && n <= pageCount) {
            setPage(n);
        }
    };

    return (
        <>
            <div className="clearfix m-b">
                <div className="pull-right m-t">
                    <input type="text" className="form-control input-s rounded inline m-r-xs" placeholder={`Search ${genre.name}...`}
                        value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                    <button className="btn btn-info btn-rounded" onClick={playAll} disabled={state.songs.length === 0}>
                        <i className={isGenrePlaying ? "icon-control-pause m-r-xs" : "icon-control-play m-r-xs"}></i>
                        {isGenrePlaying ? 'Pause' : 'Play all'}
                    </button>
                </div>
                <h2 className="font-thin m-b-xs">{genre.name}</h2>
                <span className="text-muted">
                    {genre.description}
                    {state.status === 'ok' && (genre.query ? ` · ${state.songs.length} songs` : ` · ${state.songs.length} trending songs this week`)}
                    <span className="tc-week m-l-sm">{genre.query ? 'iTunes previews + Audius full songs' : 'Full songs · Audius'}</span>
                </span>
            </div>

            {state.status === 'loading' && (
                <div className="row row-sm card-grid">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={i}>
                            <div className="song-skeleton"><span></span><i></i><b></b></div>
                        </div>
                    ))}
                </div>
            )}
            {state.status === 'error' && (
                <p className="text-muted"><i className="fa fa-exclamation-circle m-r-xs"></i>Could not load {genre.name} songs. Check your internet connection and try again.</p>
            )}
            {state.status === 'ok' && (
                <div className="row row-sm card-grid">
                    {pageSongs.length === 0 && (
                        <div className="col-xs-12 text-muted m-b">{query ? 'No songs match your search.' : `No ${genre.name} songs found right now.`}</div>
                    )}
                    {pageSongs.map((song) => (
                        <SongCard key={song.id} song={song} queue={state.songs}
                            menuOpen={menuCardId === song.id} onMenuChange={(open) => setMenuCardId(open ? song.id : null)} />
                    ))}
                </div>
            )}

            {pageCount > 1 && (
                <ul className="pagination pagination">
                    <li className={currentPage === 1 ? 'disabled' : ''}>
                        <a href="#" onClick={(e) => goTo(e, currentPage - 1)}><i className="fa fa-chevron-left"></i></a>
                    </li>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                        <li key={n} className={n === currentPage ? 'active' : ''}>
                            <a href="#" onClick={(e) => goTo(e, n)}>{n}</a>
                        </li>
                    ))}
                    <li className={currentPage === pageCount ? 'disabled' : ''}>
                        <a href="#" onClick={(e) => goTo(e, currentPage + 1)}><i className="fa fa-chevron-right"></i></a>
                    </li>
                </ul>
            )}
        </>
    )
}
