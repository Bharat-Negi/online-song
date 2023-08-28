import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function HeaderPage() {
    const [isActive, setActive] = useState("false");
    const [isLogo, setIsLogo] = useState("false");
    const [isNoti, setIsNoti] = useState("false");

    const ToggleClass = () => {
        setActive(!isActive);
    };
    const leftLogoOpen = () => {
        setIsLogo(!isLogo);
    };
    const notificationOpen = () => {
        setIsNoti(!isNoti);
    };
    
    return (
        <header className="bg-white-only header header-md navbar navbar-fixed-top-xs">
            <div className={isLogo ? "navbar-header aside bg-info nav-xs" : "navbar-header aside bg-info"}>
                <a className="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
                    <i className="icon-list"></i>
                </a>
                <Link to='/' className="navbar-brand text-lt">
                    <i className="icon-earphones"></i>
                    <img src="images/logo.png" alt="." className="hide" />
                    <span className="hidden-nav-xs m-l-sm">Online Song</span>
                </Link>
                <a className="btn btn-link visible-xs">
                    <i className="icon-settings"></i>
                </a>
            </div>
            <ul className="nav navbar-nav hidden-xs">
                <li>
                    <a href="#" className="text-muted" onClick={leftLogoOpen}>
                        <i className={isLogo ? "fa fa-indent text" : "fa fa-dedent text-active"}></i>
                    </a>
                </li>
            </ul>
            <form className="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search">
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search"></i></button>
                        </span>
                        <input type="text" className="form-control input-sm no-border rounded" placeholder="Search songs, albums..." />
                    </div>
                </div>
            </form>
            <div className="navbar-right">
                <ul className="nav navbar-nav m-n hidden-xs nav-user user">
                    <li className={isNoti ? "hidden-xs" : "hidden-xs open"}>
                        <a href="#" className="dropdown-toggle lt" onClick={notificationOpen}>
                            <i className="icon-bell"></i>
                            <span className="badge badge-sm up bg-danger count">2</span>
                        </a>
                        <section className="dropdown-menu aside-xl animated fadeInUp">
                            <section className="panel bg-white">
                                <div className="panel-heading b-light bg-light">
                                    <strong>You have <span className="count">2</span> notifications</strong>
                                </div>
                                <div className="list-group list-group-alt">
                                    <a href="#" className="media list-group-item">
                                        <span className="pull-left thumb-sm">
                                            <img src="images/a0.png" alt="..." className="img-circle" />
                                        </span>
                                        <span className="media-body block m-b-none">
                                            Use awesome animate.css<br />
                                            <small className="text-muted">10 minutes ago</small>
                                        </span>
                                    </a>
                                    <a href="#" className="media list-group-item">
                                        <span className="media-body block m-b-none">
                                            1.0 initial released<br />
                                            <small className="text-muted">1 hour ago</small>
                                        </span>
                                    </a>
                                </div>
                                <div className="panel-footer text-sm">
                                    <a href="#" className="pull-right"><i className="fa fa-cog"></i></a>
                                    <a href="#notes">See all the notifications</a>
                                </div>
                            </section>
                        </section>
                    </li>
                    <li className={isActive ? "dropdown" : "dropdown open"}>
                        <a href="#" className="dropdown-toggle bg clear" onClick={ToggleClass}>
                            <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                <img src="images/a0.png" alt="..." />
                            </span>
                            Bharat Negi <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <span className="arrow top"></span>
                                <a href="#">Settings</a>
                            </li>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="badge bg-danger pull-right">3</span>
                                    Notifications
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <Link to='/login'>Logout</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    )
}