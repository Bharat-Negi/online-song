import { useState } from 'react';
import { SongSection } from './song-card';
import { indianCollections, itunesSearch, useApiSongs } from '../common-pages/musicApi';

// Home page: Indian songs by style or language (official iTunes previews)
export default function IndianHits() {
    const [active, setActive] = useState(indianCollections[0]);
    const state = useApiSongs(() => itunesSearch(active.query, 12), 'indian:' + active.key);

    const tabs = (
        <div className="indian-tabs">
            {indianCollections.map((c) => (
                <button key={c.key} className={active.key === c.key ? 'ev-chip-btn active' : 'ev-chip-btn'} onClick={() => setActive(c)}>
                    {c.label}
                </button>
            ))}
        </div>
    );

    return (
        <div className="indian-hits">
            <SongSection title="Indian Hits" note="iTunes · 30s previews" state={state} actions={tabs}
                emptyText={`No ${active.label} songs found right now.`} />
        </div>
    );
}
