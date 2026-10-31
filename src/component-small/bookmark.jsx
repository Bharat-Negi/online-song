import { toast } from 'react-toastify';
import { useLibrary } from '../common-pages/libraryContext';

// Bookmark a song (or remove the bookmark); the song is remembered so the Bookmarks page can list it
export function useBookmark(song) {
    const library = useLibrary();
    const isBookmarked = library.isBookmarked(song.id);
    const toggle = (e) => {
        if (e) {
            e.stopPropagation();
        }
        library.rememberSong(song);
        const added = library.toggleBookmark(song.id);
        toast.info(added ? `Bookmarked "${song.name}"` : `Removed bookmark from "${song.name}"`);
    };
    return { isBookmarked, toggle };
}

// Ribbon on a song cover: always visible when bookmarked, outline on hover when not
export default function BookmarkButton({ song, className = '' }) {
    const { isBookmarked, toggle } = useBookmark(song);
    return (
        <button type="button" className={`bookmark-btn ${isBookmarked ? 'on' : ''} ${className}`} onClick={toggle}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'} aria-pressed={isBookmarked}>
            <i className={isBookmarked ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}></i>
        </button>
    );
}
