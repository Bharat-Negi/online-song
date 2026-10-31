import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLibrary } from '../common-pages/libraryContext';

// onMenuChange(open): lets the card keep its overlay visible while the menu is open
export default function AddBtnPage({ song, onMenuChange = () => {} }) {
    const library = useLibrary();
    const [isMenu, setIsMenu] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const menuRef = useRef(null);

    const isHeart = library.isFavourite(song.id);
    // Checked when the song is in any playlist
    const isPlus = library.inPlaylist(song.id) || library.playlists.some((pl) => pl.songs.includes(song.id));

    const [alignRight, setAlignRight] = useState(false);

    const openMenu = (open) => {
        if (open && menuRef.current) {
            // Open toward the left when the menu would be cut off on the right
            const container = menuRef.current.closest('.scrollable') || document.body;
            const left = menuRef.current.getBoundingClientRect().left;
            setAlignRight(left + 200 > container.getBoundingClientRect().right);
        }
        setIsMenu(open);
        setIsCreating(false);
        setNewName('');
        onMenuChange(open);
    };

    // Close the menu when clicking outside
    useEffect(() => {
        if (!isMenu) {
            return;
        }
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                openMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenu]);

    const toggleHeart = () => {
        const added = library.toggleFavourite(song.id);
        toast.info(added ? `Added "${song.name}" to favourites` : `Removed "${song.name}" from favourites`);
    };

    const toggleMine = () => {
        const added = library.togglePlaylist(song.id);
        toast.success(added ? `Added "${song.name}" to My Playlist` : `Removed "${song.name}" from My Playlist`);
    };

    const toggleCustom = (pl) => {
        const added = library.toggleSongInPlaylist(pl.id, song.id);
        toast.success(added ? `Added "${song.name}" to ${pl.name}` : `Removed "${song.name}" from ${pl.name}`);
    };

    // Create a playlist and put this song in it
    const createAndAdd = (e) => {
        e.preventDefault();
        const name = newName.trim();
        if (name === '') {
            toast.warning('Please enter a playlist name');
            return;
        }
        if (library.playlists.some((pl) => pl.name.toLowerCase() === name.toLowerCase())) {
            toast.warning(`You already have a playlist called "${name}"`);
            return;
        }
        const playlistId = library.createPlaylist(name);
        library.toggleSongInPlaylist(playlistId, song.id);
        toast.success(`Created "${name}" and added "${song.name}"`);
        openMenu(false);
    };

    return (
        <div className="bottom padder m-b-sm">
            {/* ❤️ Heart Button */}
            <span onClick={toggleHeart} className={isHeart ? "pull-right heart active" : "pull-right heart"} title={isHeart ? "Remove from favourites" : "Add to favourites"}>
                <i className={isHeart ? "fa fa-heart text-active text-danger" : "fa fa-heart-o"}></i>
            </span>

            {/* ➕ / ✔ Add to playlist */}
            <span className={isMenu ? "dropup open add-menu" : "dropup add-menu"} ref={menuRef}>
                <span onClick={() => openMenu(!isMenu)} className={isPlus ? "plus active" : "plus"} title="Add to playlist">
                    <i className={isPlus ? "fa fa-check-circle text-active text-info" : "fa fa-plus-circle"}></i>
                </span>
                <ul className={alignRight ? "dropdown-menu add-menu-list align-right" : "dropdown-menu add-menu-list"}>
                    <li className="dropdown-header">Add to playlist</li>
                    <li>
                        <a className="cus-hand" onClick={toggleMine}>
                            <i className={library.inPlaylist(song.id) ? "fa fa-check text-info pull-right m-t-xs" : "hide"}></i>
                            <i className="icon-heart text-danger m-r-xs"></i> My Playlist
                        </a>
                    </li>
                    {library.playlists.map((pl) => (
                        <li key={pl.id}>
                            <a className="cus-hand" onClick={() => toggleCustom(pl)}>
                                <i className={pl.songs.includes(song.id) ? "fa fa-check text-info pull-right m-t-xs" : "hide"}></i>
                                <i className="icon-playlist text-success m-r-xs"></i> <span className="add-menu-name">{pl.name}</span>
                            </a>
                        </li>
                    ))}
                    <li className="divider"></li>
                    <li>
                        {isCreating ? (
                            <form className="padder m-b-xs" onSubmit={createAndAdd}>
                                <input type="text" className="form-control input-sm" placeholder="Name, then Enter" autoFocus maxLength={40}
                                    value={newName} onChange={e => setNewName(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Escape') setIsCreating(false); }} />
                            </form>
                        ) : (
                            <a className="cus-hand" onClick={() => setIsCreating(true)}>
                                <i className="icon-plus m-r-xs"></i> New playlist…
                            </a>
                        )}
                    </li>
                </ul>
            </span>
        </div>
    )
}
