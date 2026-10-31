import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { UserAvatar } from '../common-pages/avatar';
import { useLibrary } from '../common-pages/libraryContext';

// Crop the picture to a centred square and shrink it to 160×160, so it stays small in db.json
const resizePhoto = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('This file is not a picture'));
        img.onload = () => {
            const size = Math.min(img.width, img.height);
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 160;
            canvas.getContext('2d').drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 160, 160);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

export default function ProfileDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({});
    const library = useLibrary();
    const fileRef = useRef(null);
    const personName = sessionStorage.getItem('username') || '';

    const changePhoto = (e) => {
        const file = e.target.files[0];
        e.target.value = '';
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast.warning('Please choose a picture (JPG, PNG, GIF or WebP)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.warning('Please choose a picture smaller than 5 MB');
            return;
        }
        resizePhoto(file).then((dataUrl) => {
            library.setAvatar(dataUrl);
            toast.success('Profile photo updated');
        }).catch((err) => {
            toast.error(err.message);
        });
    };

    const removePhoto = () => {
        library.setAvatar('');
        toast.info('Profile photo removed');
    };

    const profile = library.profile;
    const startEdit = () => {
        setForm({ city: profile.city, bio: profile.bio, twitter: profile.twitter, facebook: profile.facebook, instagram: profile.instagram });
        setIsEditing(true);
    };

    const saveProfile = (e) => {
        e.preventDefault();
        // Social fields keep only a username ("@name" or a pasted link is reduced to "name")
        const handle = (value) => value.trim().replace(/^https?:\/\/[^/]+\//i, '').replace(/^@/, '').replace(/[^A-Za-z0-9._-]/g, '');
        library.setProfile({
            city: form.city.trim().slice(0, 60),
            bio: form.bio.trim().slice(0, 300),
            twitter: handle(form.twitter),
            facebook: handle(form.facebook),
            instagram: handle(form.instagram)
        });
        setIsEditing(false);
        toast.success('Profile saved');
    };

    const field = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) });

    const socials = [
        { key: 'twitter', icon: 'fa-twitter', url: 'https://twitter.com/', color: '#1da1f2' },
        { key: 'facebook', icon: 'fa-facebook', url: 'https://facebook.com/', color: '#3b5998' },
        { key: 'instagram', icon: 'fa-instagram', url: 'https://instagram.com/', color: '#c13584' }
    ].filter((s) => profile[s.key]);

    // Each tile opens the matching tab (/profile#favourites…) or the Bookmarks page
    const stats = [
        { label: 'Favourites', value: library.favourites.length, icon: 'fa fa-heart', tone: 'fav', to: '/profile#favourites' },
        { label: 'Playlists', value: library.playlists.length + 1, icon: 'icon-playlist', tone: 'list', to: '/profile#playlists' },
        { label: 'Events', value: library.goingEvents.length, icon: 'fa fa-ticket', tone: 'event', to: '/profile#events' },
        { label: 'Bookmarks', value: library.bookmarks.length, icon: 'fa fa-bookmark', tone: 'mark', to: '/bookmarks' }
    ];

    return (
        <aside className="aside-lg bg-light lter b-r">
            <section className="vbox">
                <section className="scrollable profileScroll">
                    <div className="wrapper">
                        <div className="text-center m-b m-t">
                            <div className="profile-photo thumb-lg">
                                <UserAvatar />
                                <button className="profile-photo-btn" title="Change photo" onClick={() => fileRef.current.click()}>
                                    <i className="fa fa-camera"></i>
                                </button>
                                <input type="file" accept="image/*" ref={fileRef} className="hide" onChange={changePhoto} />
                            </div>
                            <div className="m-t-xs">
                                <a className="text-info text-xs cus-hand" onClick={() => fileRef.current.click()}>Change photo</a>
                                {library.avatar && <> · <a className="text-muted text-xs cus-hand" onClick={removePhoto}>Remove</a></>}
                            </div>
                            <div>
                                <div className="h3 m-t-xs m-b-xs text-capitalize">{personName}</div>
                                {profile.city
                                    ? <small className="text-muted"><i className="fa fa-map-marker"></i> {profile.city}</small>
                                    : <small className="text-muted">No city added</small>}
                                {profile.joined && (
                                    <small className="text-muted block m-t-xs">
                                        Member since {new Date(profile.joined).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="stat-grid m-b">
                            {stats.map((stat) => (
                                <Link to={stat.to} className={`stat-tile stat-${stat.tone}`} key={stat.label} title={`Show ${stat.label.toLowerCase()}`}>
                                    <span className="stat-icon"><i className={stat.icon}></i></span>
                                    <span className="stat-text">
                                        <strong>{stat.value}</strong>
                                        <small>{stat.label}</small>
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {isEditing ? (
                            <form className="profile-edit m-b" onSubmit={saveProfile} onKeyDown={(e) => { if (e.key === 'Escape') setIsEditing(false); }}>
                                <div className="pe-head">
                                    <strong><i className="fa fa-pencil m-r-xs"></i>Edit profile</strong>
                                    <button type="button" className="pe-close" title="Close (Esc)" onClick={() => setIsEditing(false)}><i className="fa fa-times"></i></button>
                                </div>

                                <div className="pe-section">About you</div>
                                <label className="pe-label" htmlFor="pe-city">City</label>
                                <div className="pe-field">
                                    <span className="pe-icon"><i className="fa fa-map-marker"></i></span>
                                    <input id="pe-city" type="text" placeholder="e.g. Dehradun, India" maxLength={60} autoFocus {...field('city')} />
                                </div>
                                <label className="pe-label" htmlFor="pe-bio">About me <span className="pe-count">{(form.bio || '').length}/300</span></label>
                                <div className="pe-field pe-textarea">
                                    <textarea id="pe-bio" rows="4" placeholder="A few words about you and your music" maxLength={300} {...field('bio')}></textarea>
                                </div>

                                <div className="pe-section">Social links</div>
                                {[
                                    { key: 'twitter', label: 'Twitter', icon: 'fa-twitter', color: '#1da1f2' },
                                    { key: 'facebook', label: 'Facebook', icon: 'fa-facebook', color: '#3b5998' },
                                    { key: 'instagram', label: 'Instagram', icon: 'fa-instagram', color: '#c13584' }
                                ].map((s) => (
                                    <div className="pe-field pe-social" key={s.key}>
                                        <span className="pe-icon" style={{ color: s.color }} title={s.label}><i className={'fa ' + s.icon}></i></span>
                                        <span className="pe-at">@</span>
                                        <input type="text" placeholder={`${s.label} username`} aria-label={`${s.label} username`} maxLength={60}
                                            value={form[s.key]} onChange={(e) => setForm({ ...form, [s.key]: e.target.value.replace(/^@+/, '') })} />
                                    </div>
                                ))}

                                <div className="pe-actions">
                                    <button type="submit" className="btn btn-info btn-rounded btn-block"><i className="fa fa-check m-r-xs"></i>Save changes</button>
                                    <button type="button" className="btn btn-link btn-block pe-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <button className="btn btn-info btn-rounded btn-block m-b" onClick={startEdit}>
                                    <i className="fa fa-pencil m-r-xs"></i>Edit profile
                                </button>
                                <div>
                                    <small className="text-uc text-xs text-muted">about me</small>
                                    <p className="profile-bio">{profile.bio || <span className="text-muted">Nothing here yet. Click Edit profile to add a short bio.</span>}</p>
                                    {socials.length > 0 && (
                                        <>
                                            <div className="line"></div>
                                            <small className="text-uc text-xs text-muted">connection</small>
                                            <p className="m-t-sm">
                                                {socials.map((s) => (
                                                    <a key={s.key} href={s.url + encodeURIComponent(profile[s.key])} target="_blank" rel="noreferrer"
                                                        className="btn btn-rounded btn-icon m-r-xs profile-social" style={{ background: s.color }} title={'@' + profile[s.key]}>
                                                        <i className={'fa ' + s.icon}></i>
                                                    </a>
                                                ))}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </section>
        </aside>
    )
}
