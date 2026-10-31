import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import DiscoverData from '../json-data/discover.json';
import AddBtnPage from '../component-small/addBtn';
import PlayPause from '../component-small/play-pause';
import { usePlayer, discoverSongs, formatTime } from '../common-pages/playerContext';
import { useLibrary } from '../common-pages/libraryContext';

// refreshKey: 0 keeps the original order, any other value shuffles the cards
export default function DiscoverPage({ refreshKey = 0 }) {
    const player = usePlayer();
    const library = useLibrary();
    // Card whose "add to playlist" menu is open, so its overlay stays visible
    const [menuCardId, setMenuCardId] = useState(null);

    const cards = useMemo(() => {
        if (refreshKey === 0) {
            return DiscoverData;
        }
        const list = [...DiscoverData];
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }, [refreshKey]);

    const songOf = (item) => discoverSongs.find(song => song.id === item.id);

    // The user's own rating, or the default rating from the data
    const renderStar = (data) => {
        const maxStars = 5;
        const stars = [];
        const rating = library.rating(data.id) || data.disStar;

        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <i key={i}
                    className={i <= rating ? "fa fa-star text-warning cus-hand" : "fa fa-star-o text-muted cus-hand"}
                    title={`Rate ${i} star${i > 1 ? 's' : ''}`}
                    onClick={() => library.setRating(data.id, i)} />
            );
        }
        return stars;
    };

    const toggleBookmark = (item) => {
        const added = library.toggleBookmark(item.id);
        toast.info(added ? `Bookmarked "${item.disName}"` : `Removed bookmark from "${item.disName}"`);
    };

    return (
        <div className="row row-sm">
            {cards.map(item => (
                <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={item.id}>
                    <div className="item">
                        <div className="pos-rlt">

                            {/* Live time on the card that is playing */}
                            {player.isSongPlaying(item.id) && (
                                <div className="bottom play-time">
                                    <span className="badge bg-info m-l-sm m-b-sm">
                                        {formatTime(player.currentTime)} / {player.duration ? formatTime(player.duration) : item.disTime}
                                    </span>
                                </div>
                            )}

                            {library.isBookmarked(item.id) && (
                                <div className="top" style={{ zIndex: 2 }}>
                                    <span className="pull-right m-t-n-xs m-r-sm text-white cus-hand" title="Remove bookmark" onClick={() => toggleBookmark(item)}>
                                        <i className="fa fa-bookmark i-lg"></i>
                                    </span>
                                </div>
                            )}

                            {item.disBage === 'on' && !library.isBookmarked(item.id) && (
                                <div className="top">
                                    <span className="pull-right m-t-sm m-r-sm badge bg-info">6</span>
                                </div>
                            )}

                            <div className={menuCardId === item.id ? "item-overlay opacity r r-2x bg-black active" : "item-overlay opacity r r-2x bg-black"}>
                                <div className="text-info padder m-t-sm text-sm star-space">
                                    {!library.isBookmarked(item.id) && (
                                        <span className="pull-right text-white cus-hand" title="Bookmark" onClick={() => toggleBookmark(item)}>
                                            <i className="fa fa-bookmark-o i-lg"></i>
                                        </span>
                                    )}
                                    {renderStar(item)}
                                </div>
                                <PlayPause 
                                    isPlay={player.isSongPlaying(item.id)}
                                    onToggle={() => player.toggleSong(songOf(item))}
                                 />
                                <AddBtnPage song={songOf(item)} onMenuChange={(open) => setMenuCardId(open ? item.id : null)} />
                            </div>

                            <a className="cus-hand" onClick={() => player.toggleSong(songOf(item))}>
                                <img src={item.disImg} alt={item.disName} className="r r-2x img-full" />
                            </a>
                        </div>

                        <div className="padder-v">
                            <a className={player.current.id === item.id ? "text-ellipsis cus-hand text-info" : "text-ellipsis cus-hand"} onClick={() => player.toggleSong(songOf(item))}>{item.disName}</a>
                            <span className="text-ellipsis text-xs text-muted block">{item.disSinger}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
