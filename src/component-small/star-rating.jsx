import { useEffect, useState } from 'react';
import { useLibrary } from '../common-pages/libraryContext';

// Ratings from every user's saved library: { songId: [stars, ...] } (current user excluded)
export function useCommunityRatings() {
    const library = useLibrary();
    const [others, setOthers] = useState({});
    const user = sessionStorage.getItem('username') || '';

    useEffect(() => {
        fetch('http://localhost:8000/library').then((res) => res.ok ? res.json() : []).then((records) => {
            const map = {};
            records.filter((r) => r.id !== user).forEach((r) => {
                Object.entries(r.ratings || {}).forEach(([songId, stars]) => {
                    (map[songId] = map[songId] || []).push(stars);
                });
            });
            setOthers(map);
        }).catch(() => setOthers({}));
    }, [user]);

    // Average and count, including the current user's own (live) rating
    return (songId) => {
        const list = [...(others[songId] || [])];
        const mine = library.rating(songId);
        if (mine) {
            list.push(mine);
        }
        const count = list.length;
        return { count, average: count ? list.reduce((a, b) => a + b, 0) / count : 0 };
    };
}

// Your own rating: hover to preview, click to rate, click the same star again to clear
export default function StarRating({ songId, songName }) {
    const library = useLibrary();
    const [hover, setHover] = useState(0);
    const mine = library.rating(songId) || 0;
    const shown = hover || mine;

    return (
        <span className="star-rating" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((i) => (
                <i key={i}
                    className={i <= shown ? (hover ? 'fa fa-star star-hover' : 'fa fa-star text-warning') : 'fa fa-star-o'}
                    title={mine === i ? 'Click to remove your rating' : `Rate ${songName} ${i} star${i > 1 ? 's' : ''}`}
                    onMouseEnter={() => setHover(i)}
                    onClick={() => library.setRating(songId, i)} />
            ))}
        </span>
    );
}

// "★ 4.3 (3)" or "Not rated yet"
export function RatingSummary({ summary, className = '' }) {
    if (!summary.count) {
        return <span className={`rating-summary ${className}`}>Not rated yet</span>;
    }
    return (
        <span className={`rating-summary ${className}`} title={`Average of ${summary.count} rating${summary.count === 1 ? '' : 's'}`}>
            <i className="fa fa-star"></i> {summary.average.toFixed(1)} <small>({summary.count})</small>
        </span>
    );
}
