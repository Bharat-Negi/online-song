import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserAvatar } from '../common-pages/avatar';
import { useLibrary } from '../common-pages/libraryContext';
import { usePlayer } from '../common-pages/playerContext';
import { readUiSettings, saveUiSettings } from '../common-pages/uiSettings';

const USER_API = 'http://localhost:8000/user/';

// On/off switch
function Toggle({ checked, onChange, label }) {
    return (
        <button type="button" role="switch" aria-checked={checked} aria-label={label}
            className={checked ? 'st-switch on' : 'st-switch'} onClick={() => onChange(!checked)}>
            <span></span>
        </button>
    );
}

export default function Settings() {
    const library = useLibrary();
    const player = usePlayer();
    const navigate = useNavigate();
    const user = sessionStorage.getItem('username') || '';

    const [email, setEmail] = useState('');
    const [savedEmail, setSavedEmail] = useState('');
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [ui, setUi] = useState(readUiSettings);

    useEffect(() => {
        fetch(USER_API + encodeURIComponent(user)).then((res) => res.ok ? res.json() : {}).then((resp) => {
            setEmail(resp.email || '');
            setSavedEmail(resp.email || '');
        }).catch(() => {});
    }, [user]);

    const saveEmail = (e) => {
        e.preventDefault();
        const value = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            toast.warning('Please enter a valid email');
            return;
        }
        fetch(USER_API + encodeURIComponent(user), {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: value })
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Server responded with ' + res.status);
            }
            setSavedEmail(value);
            toast.success('Email updated');
        }).catch((err) => toast.error('Could not update email: ' + err.message));
    };

    const changePassword = (e) => {
        e.preventDefault();
        if (passwords.next.length < 6) {
            toast.warning('The new password must be at least 6 characters');
            return;
        }
        if (passwords.next !== passwords.confirm) {
            toast.warning('The new passwords do not match');
            return;
        }
        fetch(USER_API + encodeURIComponent(user)).then((res) => res.ok ? res.json() : {}).then((resp) => {
            if (resp.password !== passwords.current) {
                throw new Error('Your current password is not correct');
            }
            return fetch(USER_API + encodeURIComponent(user), {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ password: passwords.next })
            });
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Server responded with ' + res.status);
            }
            setPasswords({ current: '', next: '', confirm: '' });
            toast.success('Password changed');
        }).catch((err) => toast.error(err.message));
    };

    const setCollapsed = (value) => {
        setUi(saveUiSettings({ collapsedSidebar: value }));
        toast.info(value ? 'The sidebar will start collapsed' : 'The sidebar will start open');
    };

    const downloadData = () => {
        const data = { username: user, email: savedEmail, exported: new Date().toISOString(), library: library.exportData() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `online-song-${user.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.json`;
        link.click();
        URL.revokeObjectURL(link.href);
        toast.info('Your data has been downloaded');
    };

    const clearFavourites = () => {
        if (window.confirm('Remove all your favourite songs?')) {
            library.clearFavourites();
            toast.info('Favourites cleared');
        }
    };

    const resetLibrary = () => {
        if (window.confirm('Reset your library? Favourites, playlists, bookmarks, ratings and events will be removed. Your profile and photo stay.')) {
            library.resetLibrary();
            toast.info('Library reset');
        }
    };

    const deleteAccount = () => {
        const typed = window.prompt(`This permanently deletes your account and everything saved for it.\nType your username (${user}) to confirm:`);
        if (typed === null) {
            return;
        }
        if (typed !== user) {
            toast.warning('The username did not match, so nothing was deleted');
            return;
        }
        Promise.all([
            fetch(USER_API + encodeURIComponent(user), { method: 'DELETE' }),
            fetch('http://localhost:8000/library/' + encodeURIComponent(user), { method: 'DELETE' })
        ]).then(() => {
            toast.success('Your account has been deleted');
            navigate('/login');
        }).catch((err) => toast.error('Could not delete the account: ' + err.message));
    };

    const pw = (key) => ({ value: passwords[key], onChange: (e) => setPasswords({ ...passwords, [key]: e.target.value }) });

    return (
        <section className="scrollable noJsplayer st-page">
            <div className="st-wrap">
                <h2 className="font-thin m-b-xs">Settings</h2>
                <p className="text-muted m-b-lg">Manage your account, playback and data.</p>

                <div className="st-card">
                    <div className="st-profile">
                        <span className="st-avatar"><UserAvatar /></span>
                        <span className="st-profile-text">
                            <strong className="text-capitalize">{user}</strong>
                            <small className="text-muted">{savedEmail || 'No email saved'}</small>
                        </span>
                        <Link to="/profile" className="btn btn-default btn-rounded btn-sm">Edit profile & photo</Link>
                    </div>
                </div>

                <h4 className="st-title"><i className="icon-user"></i> Account</h4>
                <div className="st-card">
                    <form className="st-row" onSubmit={saveEmail}>
                        <div className="st-label">
                            <strong>Email</strong>
                            <small>Used for your account and comments.</small>
                        </div>
                        <div className="st-control st-inline">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button type="submit" className="btn btn-info btn-rounded" disabled={email.trim() === savedEmail}>Save</button>
                        </div>
                    </form>
                    <form className="st-row" onSubmit={changePassword}>
                        <div className="st-label">
                            <strong>Password</strong>
                            <small>At least 6 characters.</small>
                        </div>
                        <div className="st-control">
                            <input type="password" className="form-control m-b-xs" placeholder="Current password" autoComplete="current-password" {...pw('current')} />
                            <input type="password" className="form-control m-b-xs" placeholder="New password" autoComplete="new-password" {...pw('next')} />
                            <input type="password" className="form-control m-b-sm" placeholder="Repeat new password" autoComplete="new-password" {...pw('confirm')} />
                            <button type="submit" className="btn btn-info btn-rounded"
                                disabled={!passwords.current || !passwords.next || !passwords.confirm}>Change password</button>
                        </div>
                    </form>
                </div>

                <h4 className="st-title"><i className="icon-earphones"></i> Playback <small>on this device</small></h4>
                <div className="st-card">
                    <div className="st-row">
                        <div className="st-label">
                            <strong>Volume</strong>
                            <small>Starting volume of the player.</small>
                        </div>
                        <div className="st-control st-inline">
                            <i className="icon-volume-1 text-muted"></i>
                            <input type="range" min="0" max="100" step="5" className="st-range" aria-label="Volume"
                                value={Math.round(player.settings.volume * 100)}
                                onChange={(e) => player.updateSettings({ volume: Number(e.target.value) / 100 })} />
                            <span className="st-value">{Math.round(player.settings.volume * 100)}%</span>
                        </div>
                    </div>
                    <div className="st-row">
                        <div className="st-label">
                            <strong>Autoplay</strong>
                            <small>Play the next song when one ends.</small>
                        </div>
                        <div className="st-control">
                            <Toggle label="Autoplay" checked={player.settings.autoplay} onChange={(value) => {
                                player.updateSettings({ autoplay: value });
                                toast.info(value ? 'Autoplay on' : 'Autoplay off: music stops after each song');
                            }} />
                        </div>
                    </div>
                </div>

                <h4 className="st-title"><i className="icon-screen-desktop"></i> Appearance <small>on this device</small></h4>
                <div className="st-card">
                    <div className="st-row">
                        <div className="st-label">
                            <strong>Collapsed sidebar</strong>
                            <small>Start with the narrow, icon-only sidebar.</small>
                        </div>
                        <div className="st-control">
                            <Toggle label="Collapsed sidebar" checked={ui.collapsedSidebar} onChange={setCollapsed} />
                        </div>
                    </div>
                </div>

                <h4 className="st-title"><i className="icon-drawer"></i> Your data</h4>
                <div className="st-card">
                    <div className="st-row">
                        <div className="st-label">
                            <strong>Download my data</strong>
                            <small>Favourites, playlists, events, ratings and profile as a JSON file.</small>
                        </div>
                        <div className="st-control"><button className="btn btn-default btn-rounded" onClick={downloadData}><i className="icon-cloud-download m-r-xs"></i>Download</button></div>
                    </div>
                    <div className="st-row">
                        <div className="st-label">
                            <strong>Clear favourites</strong>
                            <small>{library.favourites.length} favourite song{library.favourites.length === 1 ? '' : 's'}.</small>
                        </div>
                        <div className="st-control"><button className="btn btn-default btn-rounded" onClick={clearFavourites} disabled={library.favourites.length === 0}>Clear</button></div>
                    </div>
                    <div className="st-row">
                        <div className="st-label">
                            <strong>Reset library</strong>
                            <small>Remove favourites, playlists, bookmarks, ratings and events.</small>
                        </div>
                        <div className="st-control"><button className="btn btn-default btn-rounded" onClick={resetLibrary}>Reset</button></div>
                    </div>
                </div>

                <div className="st-card st-danger">
                    <div className="st-row">
                        <div className="st-label">
                            <strong className="text-danger">Delete account</strong>
                            <small>Permanently deletes your account and saved data. This cannot be undone.</small>
                        </div>
                        <div className="st-control"><button className="btn btn-danger btn-rounded" onClick={deleteAccount}>Delete account</button></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
