import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import GenresData from '../json-data/genres.json';
import AddBtnPage from '../component-small/addBtn';
import PlayPause from '../component-small/play-pause';
import { usePlayer, formatTime } from '../common-pages/playerContext';

const PAGE_SIZE = 12;

// "05:25" -> 325
const toSeconds = (time) => {
    const [m, s] = time.split(':').map(Number);
    return m * 60 + s;
};

// One genre at /genres/:genre
export default function GenrePage() {
    const { genre: slug } = useParams();
    const player = usePlayer();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    // Card whose "add to playlist" menu is open, so its overlay stays visible
    const [menuCardId, setMenuCardId] = useState(null);

    // Start fresh when switching genre
    useEffect(() => {
        setSearch('');
        setPage(1);
    }, [slug]);

    const genre = GenresData.find((g) => g.slug === slug);
    if (!genre) {
        return <Navigate to="/genres" replace />;
    }

    const query = search.trim().toLowerCase();
    const songs = genre.songs.filter((song) =>
        song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    const pageCount = Math.max(1, Math.ceil(songs.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pageSongs = songs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const totalMinutes = Math.round(genre.songs.reduce((sum, song) => sum + toSeconds(song.time), 0) / 60);
    const isGenrePlaying = player.isPlaying && genre.songs.some((song) => song.id === player.current.id);

    // Pause if this genre is playing, otherwise play it from the first song
    const playAll = () => {
        const playing = isGenrePlaying && genre.songs.find((song) => song.id === player.current.id);
        player.toggleSong(playing || genre.songs[0], genre.songs);
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
                    <button className="btn btn-info btn-rounded" onClick={playAll}>
                        <i className={isGenrePlaying ? "icon-control-pause m-r-xs" : "icon-control-play m-r-xs"}></i>
                        {isGenrePlaying ? 'Pause' : 'Play all'}
                    </button>
                </div>
                <h2 className="font-thin m-b-xs">{genre.name}</h2>
                <span className="text-muted">{genre.description} · {genre.songs.length} songs · {totalMinutes} min</span>
            </div>

            <div className="row row-sm">
                {pageSongs.length === 0 && <div className="col-xs-12 text-muted m-b">No songs found.</div>}
                {pageSongs.map((song) => (
                    <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={song.id}>
                        <div className="item">
                            <div className="pos-rlt">
                                {player.isSongPlaying(song.id) && (
                                    <div className="bottom play-time">
                                        <span className="badge bg-info m-l-sm m-b-sm">
                                            {formatTime(player.currentTime)} / {player.duration ? formatTime(player.duration) : song.time}
                                        </span>
                                    </div>
                                )}
                                <div className={menuCardId === song.id ? "item-overlay opacity r r-2x bg-black active" : "item-overlay opacity r r-2x bg-black"}>
                                    <div className="text-white padder m-t-sm text-sm">{song.time}</div>
                                    <PlayPause isPlay={player.isSongPlaying(song.id)} onToggle={() => player.toggleSong(song, genre.songs)} />
                                    <AddBtnPage song={song} onMenuChange={(open) => setMenuCardId(open ? song.id : null)} />
                                </div>
                                <a className="cus-hand" onClick={() => player.toggleSong(song, genre.songs)}>
                                    <img src={song.image} alt={song.name} className="r r-2x img-full square-thumb" />
                                </a>
                            </div>
                            <div className="padder-v">
                                <a className={player.current.id === song.id ? "text-ellipsis cus-hand text-info" : "text-ellipsis cus-hand"}
                                    onClick={() => player.toggleSong(song, genre.songs)}>{song.name}</a>
                                <span className="text-ellipsis text-xs text-muted block">{song.artist}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
