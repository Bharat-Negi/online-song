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

    const stats = [
        { label: 'Favourites', value: library.favourites.length },
        { label: 'Playlists', value: library.playlists.length + 1 },
        { label: 'Events', value: library.goingEvents.length }
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
                        <div className="panel wrapper">
                            <div className="row text-center">
                                {stats.map((stat) => (
                                    <div className="col-xs-4" key={stat.label}>
                                        <span className="m-b-xs h4 block">{stat.value}</span>
                                        <small className="text-muted">{stat.label}</small>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isEditing ? (
                            <form className="profile-edit m-b" onSubmit={saveProfile}>
                                <label>City</label>
                                <input type="text" className="form-control input-sm" placeholder="e.g. Dehradun, India" maxLength={60} {...field('city')} />
                                <label>About me</label>
                                <textarea className="form-control input-sm" rows="3" placeholder="A few words about you and your music" maxLength={300} {...field('bio')}></textarea>
                                <label>Twitter</label>
                                <input type="text" className="form-control input-sm" placeholder="username" {...field('twitter')} />
                                <label>Facebook</label>
                                <input type="text" className="form-control input-sm" placeholder="username" {...field('facebook')} />
                                <label>Instagram</label>
                                <input type="text" className="form-control input-sm" placeholder="username" {...field('instagram')} />
                                <div className="m-t">
                                    <button type="submit" className="btn btn-info btn-rounded btn-sm m-r-xs">Save</button>
                                    <button type="button" className="btn btn-default btn-rounded btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
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
