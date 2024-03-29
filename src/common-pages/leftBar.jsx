import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

const LeftBar = ({isLogo, personName}) => {
    const [isActive, setActive] = useState(false);
    const [isleft, setIsleft] = useState(false);
    const location = useLocation();

    const ToggleClass = () => {
        setActive(!isActive);
    };

    const LeftDropBar = () => {
        setIsleft(!isleft);
    };    
            
    return (
        <>
            <aside             
                className={isLogo ? "bg-black dk nav-xs aside hidden-print" : "bg-black dk aside hidden-print"}                           
            >
                <section className="vbox">
                    <section className="w-f-md scrollable leftMenuScroll">
                        <div className="slim-scroll">
                            <nav className="nav-primary hidden-xs">
                                <ul className="nav bg clearfix">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        Discover
                                    </li>
                                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                        <Link to='/'>
                                            <i className="icon-disc icon text-success"></i>
                                            <span className="font-bold">What's new</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === '/genres/acoustic' ? 'active' : ''}`}>
                                        <Link to='/genres/acoustic'>
                                            <i className="icon-music-tone-alt icon text-info"></i>
                                            <span className="font-bold">Genres</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === '/events' ? 'active' : ''}`}>
                                        <Link to='/events'>
                                            <i className="icon-drawer icon text-primary-lter"></i>
                                            <b className="badge bg-primary pull-right">6</b>
                                            <span className="font-bold">Events</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === '/listen' ? 'active' : ''}`}>
                                        <Link to='/listen'>
                                            <i className="icon-list icon text-info-dker"></i>
                                            <span className="font-bold">Listen</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === '/video' ? 'active' : ''}`}>
                                        <Link to='/video'>
                                        <i className="icon-social-youtube icon text-primary"></i>
                                            <span className="font-bold">Video</span>
                                        </Link>
                                    </li>
                                    <li className="m-b hidden-nav-xs"></li>
                                </ul>
                                <ul className="nav" data-ride="collapse">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        User Details
                                    </li>
                                    <li className={isleft ? "active" : null}>
                                        <Link onClick={LeftDropBar}>
                                            <span className="pull-right text-muted">
                                                {
                                                    isleft ? <i className="fa fa-angle-down text-active"></i> : <i className="fa fa-angle-left text"></i>
                                                }
                                            </span>
                                            <i className="icon-grid icon"></i>
                                            <span>Pages</span>
                                        </Link>
                                        <ul className="nav dk text-sm">
                                            <li>
                                                <Link to='/Profile'>
                                                    <i className="fa fa-angle-right text-xs"></i>
                                                    <span>Profile</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/blog'>
                                                    <i className="fa fa-angle-right text-xs"></i>
                                                    <span>Blog</span>
                                                </Link>
                                            </li>
                                            <li>
                                                 <Link to='/invoice'>
                                                    <i className="fa fa-angle-right text-xs"></i>
                                                    <span>Invoice</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="nav text-sm">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        <span className="pull-right">
                                            <Link><i className="icon-plus i-lg"></i></Link>
                                        </span>
                                        Playlist
                                    </li>
                                    <li>
                                        <Link>
                                            <i className="icon-music-tone icon"></i>
                                            <span>Hip-Pop</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <i className="icon-playlist icon text-success-lter"></i>
                                            <b className="badge bg-success dker pull-right">9</b>
                                            <span>Jazz</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>

                    <footer className="footer hidden-xs no-padder text-center-nav-xs">
                        <div className="bg hidden-xs ">
                            <div className={isActive ? "dropdown dropup wrapper-sm clearfix open" : "dropdown dropup wrapper-sm clearfix"}>
                                <Link className="dropdown-toggle" onClick={ToggleClass}>
                                    <span className="thumb-sm avatar pull-left m-l-xs">
                                        <img src="../images/a3.png" className="dker" alt="..." />
                                        <i className="on b-black"></i>
                                    </span>
                                    <span className="hidden-nav-xs clear">
                                        <span className="block m-l">
                                            <strong className="font-bold text-lt userName">{personName} </strong>
                                            <b className="caret"></b>
                                        </span>
                                        <span className="text-muted text-xs block m-l">Art Director</span>
                                    </span>
                                </Link>
                                <ul className="dropdown-menu animated fadeInRight aside text-left">
                                    <li>
                                        <span className="arrow bottom hidden-nav-xs"></span>
                                        <Link>Settings</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile'>Profile</Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <span className="badge bg-danger pull-right">3</span>
                                            Notifications
                                        </Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <Link to='/login'>Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </section>
            </aside>
        </>
    )
}

export default LeftBar;