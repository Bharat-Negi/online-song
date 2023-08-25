import { Link } from "react-router-dom";
import { useState } from 'react';

export default function LeftBar(isLogo) {
    const [isActive, setActive] = useState("false");

    const ToggleClass = () => {
        setActive(!isActive);
    };    

    return (
        <>
            <aside className={isLogo ? "bg-black dk nav-xs aside hidden-print" : "bg-black dk aside hidden-print"}>
                <section className="vbox">
                    <section className="w-f-md scrollable">
                        <div className="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="10px">
                            <nav className="nav-primary hidden-xs">
                                <ul className="nav bg clearfix">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        Discover
                                    </li>
                                    <li>
                                        <a href="index.html">
                                            <i className="icon-disc icon text-success"></i>
                                            <span className="font-bold">What's new</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="genres.html">
                                            <i className="icon-music-tone-alt icon text-info"></i>
                                            <span className="font-bold">Genres</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="events.html">
                                            <i className="icon-drawer icon text-primary-lter"></i>
                                            <b className="badge bg-primary pull-right">6</b>
                                            <span className="font-bold">Events</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="listen.html">
                                            <i className="icon-list icon  text-info-dker"></i>
                                            <span className="font-bold">Listen</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="video.html" data-target="#content" data-el="#bjax-el" data-replace="true">
                                            <i className="icon-social-youtube icon  text-primary"></i>
                                            <span className="font-bold">Video</span>
                                        </a>
                                    </li>
                                    <li className="m-b hidden-nav-xs"></li>
                                </ul>
                                <ul className="nav" data-ride="collapse">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        Interface
                                    </li>
                                    <li>
                                        <a href="#" className="auto">
                                            <span className="pull-right text-muted">
                                                <i className="fa fa-angle-left text"></i>
                                                <i className="fa fa-angle-down text-active"></i>
                                            </span>
                                            <i className="icon-grid icon">
                                            </i>
                                            <span>Pages</span>
                                        </a>
                                        <ul className="nav dk text-sm">
                                            <li>
                                                <a href="profile.html" className="auto">
                                                    <i className="fa fa-angle-right text-xs"></i>
                                                    <span>Profile</span>
                                                </a>
                                            </li>
                                            <li >
                                                <a href="blog.html" className="auto">
                                                    <i className="fa fa-angle-right text-xs"></i>
                                                    <span>Blog</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="invoice.html" className="auto">
                                                    <i className="fa fa-angle-right text-xs"></i>
                                                    <span>Invoice</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="nav text-sm">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        <span className="pull-right"><a href="#"><i className="icon-plus i-lg"></i></a></span>
                                        Playlist
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="icon-music-tone icon"></i>
                                            <span>Hip-Pop</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="icon-playlist icon text-success-lter"></i>
                                            <b className="badge bg-success dker pull-right">9</b>
                                            <span>Jazz</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>

                    <footer className="footer hidden-xs no-padder text-center-nav-xs">
                        <div className="bg hidden-xs ">
                            <div className={isActive ? "dropdown dropup wrapper-sm clearfix" : "dropdown dropup wrapper-sm clearfix open"}>
                                <a href="#" className="dropdown-toggle" onClick={ToggleClass}>
                                    <span className="thumb-sm avatar pull-left m-l-xs">
                                        <img src="images/a3.png" className="dker" alt="..." />
                                        <i className="on b-black"></i>
                                    </span>
                                    <span className="hidden-nav-xs clear">
                                        <span className="block m-l">
                                            <strong className="font-bold text-lt">Bharat Negi</strong>
                                            <b className="caret"></b>
                                        </span>
                                        <span className="text-muted text-xs block m-l">Art Director</span>
                                    </span>
                                </a>
                                <ul className="dropdown-menu animated fadeInRight aside text-left">
                                    <li>
                                        <span className="arrow bottom hidden-nav-xs"></span>
                                        <a href="#">Settings</a>
                                    </li>
                                    <li>
                                        <a href="profile.html">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="badge bg-danger pull-right">3</span>
                                            Notifications
                                        </a>
                                    </li>
                                    <li>
                                        <a href="docs.html">Help</a>
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