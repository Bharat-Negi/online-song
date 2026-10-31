import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState,  useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLibrary } from './libraryContext';
import { upcomingCount } from './eventUtils';
import { UserAvatar } from './avatar';

const LeftBar = ({isLogo, personName, isNavOpen, unreadCount, openNotifications}) => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();

    // Close the user menu after moving to another page
    useEffect(() => {
        setIsActive(false);
    }, [location.pathname]);
    const isPagesRoute = ['/profile', '/blog', '/invoice'].includes(location.pathname.toLowerCase());
    const [isleft, setIsleft] = useState(isPagesRoute);
    const dropdownRef = useRef(null);
    const library = useLibrary();
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);
    const [playlistName, setPlaylistName] = useState('');

    // Create a custom playlist and open it
    const createPlaylist = (e) => {
        e.preventDefault();
        const name = playlistName.trim();
        if (name === '') {
            toast.warning('Please enter a playlist name');
            return;
        }
        if (library.playlists.some((pl) => pl.name.toLowerCase() === name.toLowerCase())) {
            toast.warning(`You already have a playlist called "${name}"`);
            return;
        }
        const playlistId = library.createPlaylist(name);
        setIsCreating(false);
        setPlaylistName('');
        toast.success(`Created playlist "${name}"`);
        navigate('/playlist/' + playlistId);
    };

    const ToggleClass = () => {
        setIsActive(!isActive);
    }; 

    const LeftDropBar = () => {
        setIsleft(!isleft);
    };
    
    // 🔥 Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // if click is NOT inside dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
            
    return (
        <>
            <aside
                className={`bg-black dk aside hidden-print ${isLogo ? "nav-xs" : ""} ${isNavOpen ? "nav-off-screen" : "hidden-xs"}`}
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
                                            <span className="font-bold">What&apos;s new</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname.startsWith('/genres') ? 'active' : ''}`}>
                                        <Link to='/genres/acoustic'>
                                            <i className="icon-music-tone-alt icon text-info"></i>
                                            <span className="font-bold">Genres</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname.startsWith('/events') ? 'active' : ''}`}>
                                        <Link to='/events' title="Upcoming events">
                                            <i className="icon-drawer icon text-primary-lter"></i>
                                            {upcomingCount() > 0 && <b className="badge bg-primary pull-right">{upcomingCount()}</b>}
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
                                                <Link to='/profile'>
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
                                            <Link title="New playlist" onClick={() => setIsCreating(!isCreating)}><i className="icon-plus i-lg"></i></Link>
                                        </span>
                                        Playlist
                                    </li>
                                    {isCreating && (
                                        <li className="hidden-nav-xs">
                                            <form onSubmit={createPlaylist}>
                                                <input type="text" className="form-control input-sm playlist-new-input" placeholder="Playlist name, then Enter"
                                                    autoFocus maxLength={40} value={playlistName}
                                                    onChange={e => setPlaylistName(e.target.value)}
                                                    onKeyDown={e => { if (e.key === 'Escape') { setIsCreating(false); setPlaylistName(''); } }} />
                                            </form>
                                        </li>
                                    )}
                                    <li className={location.pathname === '/my-playlist' ? 'active' : ''}>
                                        <Link to='/my-playlist'>
                                            <i className="icon-heart icon text-danger"></i>
                                            {library.playlist.length > 0 && <b className="badge bg-danger pull-right">{library.playlist.length}</b>}
                                            <span>My Playlist</span>
                                        </Link>
                                    </li>
                                    {library.playlists.map((pl) => (
                                        <li key={pl.id} className={location.pathname === '/playlist/' + pl.id ? 'active' : ''}>
                                            <Link to={'/playlist/' + pl.id}>
                                                <i className="icon-playlist icon text-success-lter"></i>
                                                {pl.songs.length > 0 && <b className="badge bg-success dker pull-right">{pl.songs.length}</b>}
                                                <span className="text-ellipsis">{pl.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </section>

                    <footer className="footer hidden-xs no-padder text-center-nav-xs">
                        <div className="bg hidden-xs ">
                            <div className={isActive ? "dropdown dropup wrapper-sm clearfix open" : "dropdown dropup wrapper-sm clearfix"} ref={dropdownRef}>
                                <Link className="dropdown-toggle" onClick={ToggleClass}>
                                    <span className="thumb-sm avatar pull-left m-l-xs">
                                        <UserAvatar />
                                        <i className="on b-black"></i>
                                    </span>
                                    <span className="hidden-nav-xs clear">
                                        <span className="block m-l">
                                            <strong className="font-bold text-lt userName">{personName} </strong>
                                            <b className="caret"></b>
                                        </span>
                                        <span className="text-muted text-xs block m-l text-ellipsis">{library.profile.city || 'Music lover'}</span>
                                    </span>
                                </Link>
                                <ul className="dropdown-menu animated fadeInRight aside text-left">
                                    <li>
                                        <span className="arrow bottom hidden-nav-xs"></span>
                                        <Link to='/settings'>Settings</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile'>Profile</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => { setIsActive(false); openNotifications(); }}>
                                            {unreadCount > 0 && <span className="badge bg-danger pull-right">{unreadCount}</span>}
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