import { Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import JsPlayer from '../common-pages/jsPlayer'
import { usePlayer } from '../common-pages/playerContext'
import GenresData from '../json-data/genres.json'
import { genreOfSong } from '../genres-pages/genre'

export default function Genres() {
    const player = usePlayer();

    // Genre page the playing song was started from, to mark it in the list
    const playingSlug = player.isPlaying && genreOfSong.get(player.current.id);

    return (
        <>
            <section className="hbox stretch">
                <aside className="aside bg-light dk" id="sidebar">
                    <section className="vbox animated fadeInUp">
                        <section className="scrollable hover">
                            <div className="list-group no-radius no-border no-bg m-t-n-xxs m-b-none auto">
                                {GenresData.map((genre, i) => (
                                    <Fragment key={genre.slug}>
                                        {/* Group headings: Indian genres first, then the rest */}
                                        {(i === 0 || GenresData[i - 1].region !== genre.region) && (
                                            <span className="list-group-item genre-group">{genre.region === 'india' ? 'Indian' : 'World'}</span>
                                        )}
                                    <NavLink to={'/genres/' + genre.slug} className="list-group-item">
                                        {playingSlug === genre.slug && <i className="icon-volume-2 pull-right m-t-xxs" title="Playing"></i>}
                                        {genre.name}
                                    </NavLink>
                                    </Fragment>
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
