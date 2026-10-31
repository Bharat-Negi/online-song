import { useState } from 'react';
import ConnectedData from '../json-data/connected.json'
import { usePlayer, discoverSongs } from './playerContext';
import { initials, colorFor } from './avatar';

const statusOrder = ['online', 'away', 'offline'];
const statusTitle = { online: 'Online', away: 'Away', offline: 'Offline' };
// 15 -> "15 min", 120 -> "2 h", 1440 -> "1 day"
const ago = (minutes) => {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    if (minutes < 1440) {
        return `${Math.round(minutes / 60)} h`;
    }
    const days = Math.round(minutes / 1440);
    return `${days} day${days > 1 ? 's' : ''}`;
};

export default function Connected() {
    const player = usePlayer();
    const [search, searchchange] = useState('');
    const [onlineOnly, setOnlineOnly] = useState(false);

    // Match members by name or city, ignoring case
    const query = search.trim().toLowerCase();
    const members = ConnectedData.filter((member) =>
        (!onlineOnly || member.connectOn === 'online') &&
        (member.connectName.toLowerCase().includes(query) || member.connectCity.toLowerCase().includes(query))
    );
    const onlineCount = ConnectedData.filter((member) => member.connectOn === 'online').length;
    const groups = statusOrder
        .map((status) => ({ status, members: members.filter((member) => member.connectOn === status) }))
        .filter((group) => group.members.length > 0);

    return (
        <aside className="aside-md bg-light dk">
            <section className="vbox animated fadeInRight cn-vbox">
                <section className="scrollable hover cn-panel">
                    <div className="cn-head">
                        <h4 className="font-thin">Connected</h4>
                        <span className="cn-online-count"><i></i>{onlineCount} online</span>
                    </div>
                    <div className="cn-search">
                        <i className="fa fa-search"></i>
                        <input type="text" className="form-control" placeholder="Search members"
                            value={search} onChange={e => searchchange(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Escape') searchchange(''); }} />
                    </div>
                    <div className="cn-tabs">
                        <button className={!onlineOnly ? 'active' : ''} onClick={() => setOnlineOnly(false)}>All</button>
                        <button className={onlineOnly ? 'active' : ''} onClick={() => setOnlineOnly(true)}>Online</button>
                    </div>

                    {groups.length === 0 && <p className="cn-empty">No members found</p>}

                    {groups.map((group) => (
                        <div key={group.status}>
                            <div className="cn-group">{statusTitle[group.status]} — {group.members.length}</div>
                            {group.members.map((member) => {
                                const song = member.listening && discoverSongs.find((item) => item.id === member.listening);
                                const isSame = song && player.isSongPlaying(song.id);
                                return (
                                    <div className={`cn-member cn-${member.connectOn}`} key={member.id}>
                                        <span className="cn-avatar" style={{ background: colorFor(member.connectName) }}>
                                            {initials(member.connectName)}
                                            <i className="cn-dot" title={statusTitle[member.connectOn]}></i>
                                        </span>
                                        <span className="cn-text">
                                            <span className="cn-name text-ellipsis">{member.connectName}</span>
                                            {song ? (
                                                <span className="cn-status cn-listening text-ellipsis" title={`${song.name} · ${song.artist}`}>
                                                    <span className="musicbar animate cn-bars">
                                                        <span className="bar1 a1 bg-success"></span>
                                                        <span className="bar2 a2 bg-success"></span>
                                                        <span className="bar3 a3 bg-success"></span>
                                                        <span className="bar4 a4 bg-success"></span>
                                                    </span>
                                                    {song.name}
                                                </span>
                                            ) : (
                                                <span className="cn-status text-ellipsis">
                                                    {member.connectOn === 'away' ? `Away · ${ago(member.lastSeen)}` : `Last seen ${ago(member.lastSeen)} ago`}
                                                </span>
                                            )}
                                            <span className="cn-city text-ellipsis"><i className="fa fa-map-marker"></i> {member.connectCity}</span>
                                        </span>
                                        {song && (
                                            <button className={isSame ? "cn-join active" : "cn-join"} onClick={() => player.toggleSong(song)}
                                                title={isSame ? 'Pause' : `Listen along: ${song.name}`}>
                                                <i className={isSame ? "fa fa-pause" : "fa fa-play"}></i>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </section>
            </section>
        </aside>
    )
}
