import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../common-pages/playerContext";
import { useLibrary } from "../common-pages/libraryContext";
import { timeAgo } from "../common-pages/useNotifications";
import { formatDay, isPast, whenLabel } from "../common-pages/eventUtils";
import EventData from "../json-data/events.json";

// Where a comment was posted: "blog-2" or "video-3"
const commentPlace = (page) => {
    const post = /^blog-(\d+)$/.exec(page);
    if (post) {
        return { label: 'Blog post', link: '/blog/' + post[1] + '#comments' };
    }
    const match = /^video-(\d+)$/.exec(page);
    return match ? { label: 'Video', link: '/video/' + match[1] } : { label: page, link: '/' };
};

function Empty({ icon, text, link, linkText }) {
    return (
        <div className="profile-empty">
            <i className={icon}></i>
            <p className="text-muted">{text}</p>
            {link && <Link to={link} className="btn btn-sm btn-info btn-rounded">{linkText}</Link>}
        </div>
    );
}

export default function ProfileTab() {
    const player = usePlayer();
    const library = useLibrary();
    const [tab, setTab] = useState('favourites');
    const { hash } = useLocation();

    // /profile#events etc. opens that tab (used by the stat tiles)
    useEffect(() => {
        const wanted = hash.replace('#', '');
        if (['favourites', 'playlists', 'events', 'comments'].includes(wanted)) {
            setTab(wanted);
        }
    }, [hash]);
    const [comments, setComments] = useState([]);
    const user = sessionStorage.getItem('username') || '';

    // Comments this user has posted anywhere
    useEffect(() => {
        fetch('http://localhost:8000/comment?name=' + encodeURIComponent(user) + '&_sort=time&_order=desc').then((res) => {
            return res.ok ? res.json() : [];
        }).then(setComments).catch(() => setComments([]));
    }, [user]);

    const favourites = library.favourites.map(library.findSong).filter(Boolean);
    const playlists = [
        { id: 'mine', name: 'My Playlist', link: '/my-playlist', songs: library.playlist },
        ...library.playlists.map((pl) => ({ id: pl.id, name: pl.name, link: '/playlist/' + pl.id, songs: pl.songs }))
    ];
    const events = EventData.filter((e) => library.goingEvents.includes(e.id)).sort((a, b) => new Date(a.date) - new Date(b.date));

    const tabs = [
        { key: 'favourites', label: 'Favourites', count: favourites.length },
        { key: 'playlists', label: 'Playlists', count: playlists.length },
        { key: 'events', label: 'Events', count: events.length },
        { key: 'comments', label: 'Comments', count: comments.length }
    ];

    return (
        <aside className="bg-white">
            <section className="vbox">
                <header className="header bg-light lt">
                    <ul className="nav nav-tabs nav-white">
                        {tabs.map((t) => (
                            <li key={t.key} className={tab === t.key ? 'active' : null}>
                                <a className="cus-hand" onClick={() => setTab(t.key)}>
                                    {t.label} <span className="badge bg-light m-l-xs">{t.count}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </header>
                <section className="scrollable profileScrollTab">
                    {tab === 'favourites' && (favourites.length === 0
                        ? <Empty icon="fa fa-heart-o" text="No favourite songs yet. Tap ♥ on any song." link="/" linkText="Discover songs" />
                        : (
                            <ul className="list-group no-radius m-b-none list-group-lg no-border">
                                {favourites.map((song) => {
                                    const isPlaying = player.isSongPlaying(song.id);
                                    return (
                                        <li className="list-group-item profile-row" key={song.id}>
                                            <a className="profile-row-play cus-hand" onClick={() => player.toggleSong(song, favourites)} title={isPlaying ? 'Pause' : 'Play'}>
                                                <i className={isPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                                            </a>
                                            <img src={song.image} alt={song.name} className="profile-row-img" />
                                            <span className="profile-row-text">
                                                <strong className={player.current.id === song.id ? "text-info text-ellipsis" : "text-ellipsis"}>{song.name}</strong>
                                                <small className="text-muted text-ellipsis">{song.artist}</small>
                                            </span>
                                            <small className="text-muted m-r">{song.time}</small>
                                            <a className="cus-hand" title="Remove from favourites" onClick={() => library.toggleFavourite(song.id)}>
                                                <i className="fa fa-heart text-danger"></i>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        ))}

                    {tab === 'playlists' && (
                        <ul className="list-group no-radius m-b-none list-group-lg no-border">
                            {playlists.map((pl) => {
                                const cover = pl.songs.map(library.findSong).find(Boolean);
                                return (
                                    <li className="list-group-item profile-row" key={pl.id}>
                                        {cover
                                            ? <img src={cover.image} alt="" className="profile-row-img" />
                                            : <span className="profile-row-img profile-row-icon"><i className={pl.id === 'mine' ? "icon-heart" : "icon-playlist"}></i></span>}
                                        <span className="profile-row-text">
                                            <Link to={pl.link} className="text-ellipsis"><strong>{pl.name}</strong></Link>
                                            <small className="text-muted">{pl.songs.length} song{pl.songs.length === 1 ? '' : 's'}</small>
                                        </span>
                                        <Link to={pl.link} className="btn btn-xs btn-default btn-rounded">Open</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {tab === 'events' && (events.length === 0
                        ? <Empty icon="icon-calendar" text="You're not going to any events yet." link="/events" linkText="Browse events" />
                        : (
                            <ul className="list-group no-radius m-b-none list-group-lg no-border">
                                {events.map((e) => (
                                    <li className="list-group-item profile-row" key={e.id}>
                                        <img src={e.image} alt={e.title} className="profile-row-img" />
                                        <span className="profile-row-text">
                                            <Link to={'/events/' + e.id} className="text-ellipsis"><strong>{e.title}</strong></Link>
                                            <small className="text-muted text-ellipsis">{formatDay(e.date)} · {e.venue}, {e.city}</small>
                                        </span>
                                        <span className={isPast(e) ? "label bg-dark" : "label bg-success"}>{whenLabel(e)}</span>
                                    </li>
                                ))}
                            </ul>
                        ))}

                    {tab === 'comments' && (comments.length === 0
                        ? <Empty icon="fa fa-comment-o" text="You haven't posted any comments yet." link="/blog" linkText="Go to the blog" />
                        : (
                            <ul className="list-group no-radius m-b-none list-group-lg no-border">
                                {comments.map((c) => {
                                    const place = commentPlace(c.page);
                                    return (
                                        <li className="list-group-item" key={c.id}>
                                            <small className="pull-right text-muted">{timeAgo(c.time)}</small>
                                            <Link to={place.link} className="text-info"><i className="fa fa-comment-o m-r-xs"></i>{place.label}</Link>
                                            <p className="m-t-xs m-b-none comment-text">{c.text}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        ))}
                </section>
            </section>
        </aside>
    )
}
