import { useMemo, useState } from 'react';
import AddBtnPage from '../component-small/addBtn';
import PlayPause from '../component-small/play-pause';
import { usePlayer, formatTime } from '../common-pages/playerContext';
import { useTrending, onCoverError } from '../common-pages/musicApi';
import StarRating, { RatingSummary, useCommunityRatings } from '../component-small/star-rating';
import BookmarkButton from '../component-small/bookmark';

// Discover: this week's trending full songs on Audius.
// refreshKey: 0 keeps the trending order, any other value shuffles the cards
export default function DiscoverPage({ refreshKey = 0 }) {
    const player = usePlayer();
    const trending = useTrending();
    // Card whose "add to playlist" menu is open, so its overlay stays visible
    const [menuCardId, setMenuCardId] = useState(null);

    const songs = useMemo(() => {
        if (refreshKey === 0) {
            return trending.songs;
        }
        const list = [...trending.songs];
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }, [refreshKey, trending.songs]);

    // Average of all users' ratings for a song
    const ratingOf = useCommunityRatings();

    if (trending.status === 'loading' && songs.length === 0) {
        return (
            <div className="row row-sm card-grid">
                {Array.from({ length: 12 }, (_, i) => (
                    <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={i}>
                        <div className="song-skeleton"><span></span><i></i><b></b></div>
                    </div>
                ))}
            </div>
        );
    }
    if (trending.status === 'error') {
        return <p className="text-muted m-b-lg"><i className="fa fa-exclamation-circle m-r-xs"></i>Could not load songs. Check your internet connection and refresh the page.</p>;
    }

    return (
        <div className="row row-sm card-grid">
            {songs.map(song => (
                <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={song.id}>
                    <div className="item">
                        <div className="pos-rlt">

                            {/* Live time on the card that is playing */}
                            {player.isSongPlaying(song.id) && (
                                <div className="bottom play-time">
                                    <span className="badge bg-info m-l-sm m-b-sm">
                                        {formatTime(player.currentTime)} / {player.duration ? formatTime(player.duration) : song.time}
                                    </span>
                                </div>
                            )}

                            <BookmarkButton song={song} />

                            <div className={menuCardId === song.id ? "item-overlay opacity r r-2x bg-black active" : "item-overlay opacity r r-2x bg-black"}>
                                <div className="text-info padder m-t-sm text-sm star-space">
                                    <StarRating songId={song.id} songName={song.name} />
                                    <RatingSummary summary={ratingOf(song.id)} className="block m-t-xs text-white" />
                                </div>
                                <PlayPause
                                    isPlay={player.isSongPlaying(song.id)}
                                    onToggle={() => player.toggleSong(song, songs)}
                                />
                                <AddBtnPage song={song} onMenuChange={(open) => setMenuCardId(open ? song.id : null)} />
                            </div>

                            <a className="cus-hand" onClick={() => player.toggleSong(song, songs)}>
                                <img src={song.image} alt={song.name} className="r r-2x img-full square-thumb cover-loading" loading="lazy" onError={onCoverError} />
                            </a>
                        </div>

                        <div className="padder-v">
                            <a className={player.current.id === song.id ? "text-ellipsis cus-hand text-info" : "text-ellipsis cus-hand"}
                                onClick={() => player.toggleSong(song, songs)} title={song.name}>{song.name}</a>
                            <span className="card-meta text-xs text-muted">
                                <span className="text-ellipsis">{song.artist}</span>
                                {ratingOf(song.id).count > 0 && <RatingSummary summary={ratingOf(song.id)} />}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
