import { NavLink, Outlet, useLocation } from 'react-router-dom'
import JsPlayer from '../common-pages/jsPlayer'

export default function Genres() {
    const location = useLocation();

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
                                <NavLink to='/genres/acoustic' className="list-group-item">
                                    acoustic
                                </NavLink>
                                <NavLink to='/genres/ambient' className="list-group-item">
                                    ambient
                                </NavLink>
                                <NavLink to='/genres/blues' className="list-group-item">
                                    blues
                                </NavLink>
                                <NavLink to='/genres/classical' className="list-group-item">
                                    classical
                                </NavLink>
                                <a href="#" className="list-group-item">
                                    country
                                </a>                                                             
                                <a href="#" className="list-group-item">
                                    country
                                </a>
                                <a href="#" className="list-group-item">
                                    electronic
                                </a>
                                <a href="#" className="list-group-item">
                                    emo
                                </a>
                                <a href="#" className="list-group-item">
                                    folk
                                </a>
                                <a href="#" className="list-group-item">
                                    hardcore
                                </a>
                                <a href="#" className="list-group-item">
                                    hip hop
                                </a>
                                <a href="#" className="list-group-item">
                                    indie
                                </a>
                                <a href="#" className="list-group-item">
                                    jazz
                                </a>
                                <a href="#" className="list-group-item">
                                    latin
                                </a>
                                <a href="#" className="list-group-item">
                                    metal
                                </a>
                                <a href="#" className="list-group-item">
                                    pop
                                </a>
                                <a href="#" className="list-group-item">
                                    pop punk
                                </a>
                                <a href="#" className="list-group-item">
                                    punk
                                </a>
                                <a href="#" className="list-group-item">
                                    reggae
                                </a>
                                <a href="#" className="list-group-item">
                                    rnb
                                </a>
                                <a href="#" className="list-group-item">
                                    rock
                                </a>
                                <a href="#" className="list-group-item">
                                    soul
                                </a>
                                <a href="#" className="list-group-item">
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