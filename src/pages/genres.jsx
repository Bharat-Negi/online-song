import { Link, Outlet } from 'react-router-dom'
import JsPlayer from '../common-pages/jsPlayer'

export default function Genres() {
    return (
        <>
            <section className="hbox stretch">
                <aside className="aside bg-light dk" id="sidebar">
                    <section className="vbox animated fadeInUp">
                        <section className="scrollable hover">
                            <div className="list-group no-radius no-border no-bg m-t-n-xxs m-b-none auto">
                                {/* <Link to='/genres/all' className="list-group-item">
                                    all
                                </Link> */}
                                <Link to='/genres/acoustic' className="list-group-item active">
                                    acoustic
                                </Link>
                                <Link to='/genres/ambient' className="list-group-item">
                                    ambient
                                </Link>
                                <Link to='/genres/blues' className="list-group-item">
                                    blues
                                </Link>
                                <Link to='/genres/classical' className="list-group-item">
                                    classical
                                </Link>                                                             
                                <a href="genres.html" className="list-group-item">
                                    country
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    electronic
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    emo
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    folk
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    hardcore
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    hip hop
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    indie
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    jazz
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    latin
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    metal
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    pop
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    pop punk
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    punk
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    reggae
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    rnb
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    rock
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    soul
                                </a>
                                <a href="genres.html" className="list-group-item">
                                    world
                                </a>
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