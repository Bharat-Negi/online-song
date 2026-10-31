import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { timeAgo } from './useNotifications';
import { UserAvatar } from './avatar';

export default function HeaderPage({leftLogoOpen, isLogo, personName, mobileNavToggle, notifications, isNoti, setIsNoti}) {
    const [isActive, setIsActive] = useState(false);
    const [isUserMenu, setIsUserMenu] = useState(false);   // 👈 mobile user menu
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    // Keep the box in sync with /search?q=...
    useEffect(() => {
        setQuery(pathname === '/search' ? new URLSearchParams(search).get('q') || '' : '');
    }, [pathname, search]);

    const submitSearch = (e) => {
        e.preventDefault();
        const text = query.trim();
        navigate(text ? '/search?q=' + encodeURIComponent(text) : '/search');
    };

    // Close the menus after moving to another page
    useEffect(() => {
        setIsActive(false);
        setIsUserMenu(false);
    }, [pathname]);
    const { notifications: list, unreadCount, markRead, markAllRead } = notifications;

    const userRef = useRef(null);       // 👈 user dropdown
    const notiRef = useRef(null);       // 👈 notification dropdown

    const ToggleClass = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    };
    const notificationOpen = (e) => {
        e.preventDefault();
        setIsNoti(!isNoti);
    };
    // Open the bell dropdown from the "Notifications" item in the user menu
    const showNotifications = (e) => {
        e.preventDefault();
        setIsActive(false);
        setIsNoti(true);
    };
    const markAllClick = (e) => {
        e.preventDefault();
        markAllRead();
    };

    // 🔥 Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close user dropdown
            if (userRef.current && !userRef.current.contains(event.target)) {
                setIsActive(false);
            }
            // Close notification dropdown
            if (notiRef.current && !notiRef.current.contains(event.target)) {
                setIsNoti(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);
    
    return (
        <header className="bg-white-only header header-md navbar navbar-fixed-top-xs">
            <div className={isLogo ? "navbar-header aside bg-info nav-xs" : "navbar-header aside bg-info"}>
                <a className="btn btn-link visible-xs" onClick={mobileNavToggle}>
                    <i className="icon-list"></i>
                </a>
                <Link to='/' className="navbar-brand text-lt">
                    <i className="icon-earphones"></i>
                    <img src="../images/logo.png" alt="." className="hide" />
                    <span className="hidden-nav-xs m-l-sm">Online Song</span>
                </Link>
                <a className="btn btn-link visible-xs" onClick={() => setIsUserMenu(!isUserMenu)}>
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
            <form className="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search" onSubmit={submitSearch}>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search"></i></button>
                        </span>
                        <input type="text" className="form-control input-sm no-border rounded" placeholder="Search songs, artists..."
                            value={query} onChange={e => setQuery(e.target.value)} aria-label="Search songs" />
                    </div>
                </div>
            </form>
            <div className="navbar-right">
                <ul className={isUserMenu ? "nav navbar-nav m-n hidden-xs nav-user user show" : "nav navbar-nav m-n hidden-xs nav-user user"}>
                {/* 🔔 Notification Dropdown */}
                    <li className={isNoti ? "hidden-xs open" : "hidden-xs"} ref={notiRef}>
                        <a href="#" className="dropdown-toggle lt" onClick={notificationOpen}>
                            <i className="icon-bell"></i>
                            {unreadCount > 0 && <span className="badge badge-sm up bg-danger count">{unreadCount}</span>}
                        </a>
                        <section className="dropdown-menu aside-xl animated fadeInUp">
                            <section className="panel bg-white">
                                <div className="panel-heading b-light bg-light">
                                    <strong>You have <span className="count">{unreadCount}</span> new notification{unreadCount === 1 ? '' : 's'}</strong>
                                </div>
                                <div className="list-group list-group-alt notification-list">
                                    {list.length === 0 && (
                                        <span className="list-group-item text-muted">No notifications</span>
                                    )}
                                    {list.map((item) => (
                                        <Link key={item.id} to={item.link}
                                            className={item.read ? "media list-group-item notification-item" : "media list-group-item notification-item unread"}
                                            onClick={() => { markRead(item.id); setIsNoti(false); }}>
                                            <span className="pull-left thumb-sm">
                                                <img src={item.image} alt="..." className="img-circle" />
                                            </span>
                                            <span className="media-body block m-b-none">
                                                {item.text}<br />
                                                <small className="text-muted">{timeAgo(item.time)}</small>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                                <div className="panel-footer text-sm">
                                    {unreadCount > 0
                                        ? <a href="#" onClick={markAllClick}>Mark all as read</a>
                                        : <span className="text-muted">You&apos;re all caught up</span>}
                                </div>
                            </section>
                        </section>
                    </li>

                    {/* 👤 User Dropdown */}
                    <li className={isActive ? "dropdown open" : "dropdown"} ref={userRef}>
                        <a href="#" className="dropdown-toggle bg clear userName" onClick={ToggleClass}>
                            <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                <UserAvatar />
                            </span>
                            {personName} <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <span className="arrow top"></span>
                                <Link to='/settings'>Settings</Link>
                            </li>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                            <li>
                                <a href="#" onClick={showNotifications}>
                                    {unreadCount > 0 && <span className="badge bg-danger pull-right">{unreadCount}</span>}
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