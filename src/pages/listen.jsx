import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import JsPlayer from '../common-pages/jsPlayer';
import { usePlayer } from '../common-pages/playerContext';
import ListenData from '../json-data/listen.json';

const tiles = [
    { title: 'Find', text: 'Search the music you like', color: 'text-info', image: '../images/m40.jpg', to: '/genres/acoustic' },
    { title: 'Listen', text: 'Find the peace in your heart', color: 'text-warning', image: '../images/m41.jpg', action: 'play', right: true },
    { title: 'Share', text: 'Share the good songs with your loves', color: 'text-success', image: '../images/m42.jpg', action: 'share' },
    { title: '2014', text: 'Find, Listen & Share', color: 'text-white', image: '../images/m44.jpg', to: '/events', right: true },
    { title: 'Top10', text: 'Selected songs', color: 'text-danger-lter', image: '../images/m45.jpg', to: '/' }
];

export default function Listen() {
    const player = usePlayer();
    const [album, setAlbum] = useState(ListenData.album);
    const { artist, artists, songs } = ListenData;

    const isAlbumPlaying = player.isPlaying && album.some((song) => song.id === player.current.id);

    // Header follows the song in the player; Soph Ashe until something has been played.
    // Picture: the song's own cover, else its artist's picture, else its thumbnail
    const nowPlaying = player.hasSong ? player.current : null;
    const known = nowPlaying && artists[nowPlaying.artist];
    const header = !nowPlaying ? artist : {
        name: nowPlaying.artist,
        image: nowPlaying.cover || (known && known.image) || nowPlaying.image || artist.image,
        followers: known ? known.followers : null
    };

    // Header click: pause/resume the current song, or start the album
    const headerClick = () => {
        if (nowPlaying) {
            player.togglePlay();
        } else {
            playAlbum();
        }
    };

    const addToQueue = (song) => {
        if (player.addToQueue(song)) {
            toast.success(`"${song.name}" added to the play queue`);
        } else {
            toast.info(`"${song.name}" is already in the play queue`);
        }
    };

    const removeFromAlbum = (song) => {
        setAlbum(album.filter((item) => item.id !== song.id));
        toast.info(`"${song.name}" removed from the list`);
    };

    // Play the album, or pause/resume it if it is already the current list
    const playAlbum = () => {
        if (album.length === 0) {
            return;
        }
        const inAlbum = album.find((song) => song.id === player.current.id);
        player.toggleSong(inAlbum || album[0], album);
    };

    const share = () => {
        const text = `Listening to ${player.current.name} by ${player.current.artist} - ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Link copied to clipboard');
        }).catch(() => {
            toast.error('Could not copy the link');
        });
    };

    const tileClick = (e, tile) => {
        if (tile.action) {
            e.preventDefault();
            tile.action === 'play' ? playAlbum() : share();
        }
    };

    return (
        <>
            <section className="w-f-md">
                <section className="hbox stretch bg-black dker">
                    <aside className="col-sm-5 no-padder" id="sidebar">
                        <section className="vbox animated fadeInUp">
                            <section className="scrollable" style={{position: 'absolute'}}>
                                <div className="m-t-n-xxs item pos-rlt cus-hand" onClick={headerClick} title={player.isPlaying ? 'Pause' : nowPlaying ? 'Play' : 'Play all'}>
                                    <div className="top text-right">
                                        <span className={player.isPlaying ? "musicbar animate bg-success bg-empty inline m-r-lg m-t" : "musicbar bg-success bg-empty inline m-r-lg m-t"} style={{width:'25px', height:'30px'}}>
                                            <span className="bar1 a3 lter"></span>
                                            <span className="bar2 a5 lt"></span>
                                            <span className="bar3 a1 bg"></span>
                                            <span className="bar4 a4 dk"></span>
                                            <span className="bar5 a2 dker"></span>
                                        </span>
                                    </div>
                                    <div className="bottom gd bg-info wrapper-lg">
                                        {header.followers && <span className="pull-right text-sm">{header.followers} <br />Followers</span>}
                                        <span className="h2 font-thin block text-ellipsis">{header.name}</span>
                                        {nowPlaying && (
                                            <span className="block text-ellipsis now-playing">
                                                <i className={player.isPlaying ? "icon-control-play m-r-xs" : "icon-control-pause m-r-xs"}></i>
                                                {player.isPlaying ? 'Now playing' : 'Paused'}: {nowPlaying.name}
                                            </span>
                                        )}
                                    </div>
                                    {/* key: fade in again when the picture changes */}
                                    <img key={header.image} className="img-full listen-cover animated fadeIn" src={header.image} alt={header.name} />
                                </div>
                                <ul className="list-group list-group-lg no-radius no-border no-bg m-t-n-xxs m-b-none auto">
                                    {album.length === 0 && (
                                        <li className="list-group-item text-muted">No songs left in this list</li>
                                    )}
                                    {album.map((song) => (
                                        <li className="list-group-item" key={song.id}>
                                            <div className="pull-right m-l">
                                                <a href={song.src} target="_blank" rel="noreferrer" download className="m-r-sm" title="Download"><i className="icon-cloud-download"></i></a>
                                                <a className="m-r-sm cus-hand" title="Add to play queue" onClick={() => addToQueue(song)}><i className="icon-plus"></i></a>
                                                <a className="cus-hand" title="Remove" onClick={() => removeFromAlbum(song)}><i className="icon-close"></i></a>
                                            </div>
                                            <a className={player.isSongPlaying(song.id) ? "jp-play-me m-r-sm pull-left cus-hand active" : "jp-play-me m-r-sm pull-left cus-hand"}
                                                onClick={() => player.toggleSong(song, album)}>
                                                <i className="icon-control-play text"></i>
                                                <i className="icon-control-pause text-active"></i>
                                            </a>
                                            <div className="clear text-ellipsis">
                                                <span className={player.current.id === song.id ? "text-info" : ""}>{song.name}</span>
                                                <span className="text-muted"> -- {song.time}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </section>
                    </aside>
                    <section className="col-sm-4 no-padder bg">
                        <section className="vbox">
                            <section className="scrollable hover">
                                <ul className="list-group list-group-lg no-bg auto m-b-none m-t-n-xxs">
                                    {songs.map((song) => (
                                        <li className="list-group-item clearfix" key={song.id}>
                                            <a className={player.isSongPlaying(song.id) ? "jp-play-me pull-right m-t-sm m-l text-md cus-hand active" : "jp-play-me pull-right m-t-sm m-l text-md cus-hand"}
                                                onClick={() => player.toggleSong(song, songs)}>
                                                <i className="icon-control-play text"></i>
                                                <i className="icon-control-pause text-active"></i>
                                            </a>
                                            <a className="pull-left thumb-sm m-r cus-hand" onClick={() => player.toggleSong(song, songs)}>
                                                <img src={song.cover || song.image} alt={song.name} className="square-thumb" />
                                            </a>
                                            <a className="clear cus-hand" onClick={() => player.toggleSong(song, songs)}>
                                                <span className={player.current.id === song.id ? "block text-ellipsis text-info" : "block text-ellipsis"}>{song.name}</span>
                                                <small className="text-muted">by {song.artist} -- {song.time}</small>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </section>
                    </section>
                    <section className="col-sm-3 no-padder lt">
                        <section className="vbox">
                            <section className="scrollable hover">
                                <div className="m-t-n-xxs">
                                    {tiles.map((tile) => (
                                        <div className="item pos-rlt" key={tile.title}>
                                            <Link to={tile.to || '#'} onClick={(e) => tileClick(e, tile)}
                                                className={tile.right ? "item-overlay active opacity wrapper-md font-xs text-right" : "item-overlay active opacity wrapper-md font-xs"}>
                                                <span className={`block h3 font-bold text-u-c ${tile.color}`}>
                                                    {tile.action === 'play' && isAlbumPlaying ? 'Pause' : tile.title}
                                                </span>
                                                <span className="text-muted">{tile.text}</span>
                                                {tile.right
                                                    ? <span className="bottom wrapper-md block"><i className="icon-arrow-right i-lg pull-left"></i> -</span>
                                                    : <span className="bottom wrapper-md block">- <i className="icon-arrow-right i-lg pull-right"></i></span>}
                                            </Link>
                                            <img className="img-full" src={tile.image} alt={tile.title} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
            <JsPlayer />
        </>
    )
}
