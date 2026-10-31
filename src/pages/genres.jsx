import { NavLink, Outlet } from 'react-router-dom'
import JsPlayer from '../common-pages/jsPlayer'
import { usePlayer } from '../common-pages/playerContext'
import GenresData from '../json-data/genres.json'

export default function Genres() {
    const player = usePlayer();

    // Genre of the song that is playing, to mark it in the list
    const playingGenre = player.isPlaying && GenresData.find((g) => g.songs.some((song) => song.id === player.current.id));

    return (
        <>
            <section className="hbox stretch">
                <aside className="aside bg-light dk" id="sidebar">
                    <section className="vbox animated fadeInUp">
                        <section className="scrollable hover">
                            <div className="list-group no-radius no-border no-bg m-t-n-xxs m-b-none auto">
                                {GenresData.map((genre) => (
                                    <NavLink key={genre.slug} to={'/genres/' + genre.slug} className="list-group-item">
                                        <span className="badge pull-right">{genre.songs.length}</span>
                                        {playingGenre && playingGenre.slug === genre.slug && <i className="icon-volume-2 pull-right m-r-sm m-t-xxs" title="Playing"></i>}
                                        {genre.name}
                                    </NavLink>
                                ))}
                            </div>
                        </section>
                    </section>
                </aside>
                <section>
                    <section className="vbox">
                        <section className="scrollable padder-lg">
                            <Outlet />
                        </section>
                    </section>
                </section>
            </section>
            <JsPlayer />
        </>
    )
}
