import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileTab from '../component-small/profile-tab'
import ProfileDetails from '../component-small/profile-details'
import { Avatar } from '../common-pages/avatar'
import { usePlayer, discoverSongs } from '../common-pages/playerContext'
import ConnectedData from '../json-data/connected.json'

export default function Profile() {
  const player = usePlayer();
  const user = sessionStorage.getItem('username') || '';
  const [email, setEmail] = useState('');

  // Only the email is used from the account record
  useEffect(() => {
    fetch('http://localhost:8000/user/' + encodeURIComponent(user)).then((res) => {
      return res.ok ? res.json() : {};
    }).then((resp) => setEmail(resp.email || '')).catch(() => setEmail(''));
  }, [user]);

  const friends = ConnectedData.filter((m) => m.connectOn === 'online' && m.connectName.toLowerCase() !== user.toLowerCase());

  return (
    <>
      <section className="scrollable noJsplayer">
        <section className="hbox stretch">
          <ProfileDetails />
          <ProfileTab />
          <aside className="col-lg-3 b-l">
            <section className="vbox">
              <section className="scrollable padder-v profileScroll">
                <div className="panel">
                  <h4 className="font-thin padder">Account</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <small className="text-muted block">Username</small>
                      <strong>{user}</strong>
                    </li>
                    <li className="list-group-item">
                      <small className="text-muted block">Email</small>
                      {email ? <a href={'mailto:' + email}>{email}</a> : <span className="text-muted">Not available</span>}
                    </li>
                    <li className="list-group-item">
                      <Link to="/my-playlist"><i className="icon-heart text-danger m-r-xs"></i>My Playlist</Link>
                    </li>
                  </ul>
                </div>
                <div className="panel">
                  <h4 className="font-thin padder">Friends online <small className="text-success">{friends.length}</small></h4>
                  <ul className="list-group">
                    {friends.length === 0 && <li className="list-group-item text-muted">Nobody is online right now.</li>}
                    {friends.map((f) => {
                      const song = f.listening && discoverSongs.find((s) => s.id === f.listening);
                      const isSame = song && player.isSongPlaying(song.id);
                      return (
                        <li className="list-group-item profile-friend" key={f.id}>
                          <span className="profile-friend-avatar"><Avatar name={f.connectName} /></span>
                          <span className="profile-row-text">
                            <strong className="text-ellipsis">{f.connectName}</strong>
                            <small className="text-success text-ellipsis">{song ? '♪ ' + song.name : 'Online'}</small>
                          </span>
                          {song && (
                            <a className="cus-hand" onClick={() => player.toggleSong(song)} title={isSame ? 'Pause' : 'Listen along'}>
                              <i className={isSame ? "fa fa-pause text-success" : "fa fa-play text-info"}></i>
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </section>
          </aside>
        </section>
      </section>
    </>
  )
}
