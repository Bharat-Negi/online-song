import { useNavigate, useSearchParams } from 'react-router-dom';
import JsPlayer from '../common-pages/jsPlayer';
import { SongSection } from '../component-small/song-card';
import { audiusSearch, audiusTrending, itunesSearch, useApiSongs } from '../common-pages/musicApi';

const suggestions = ['Arijit Singh', 'Lofi', 'Bollywood', 'Punjabi', 'Jazz', 'A. R. Rahman', 'Chill', 'Coldplay'];

// /search?q=... : full songs from Audius and 30-second previews from iTunes
export default function SearchPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const query = (params.get('q') || '').trim();

    const audius = useApiSongs(query ? () => audiusSearch(query, 12) : () => audiusTrending('', 12), 'au:' + query);
    const itunes = useApiSongs(query ? () => itunesSearch(query, 12) : null, 'it:' + query);

    const searchFor = (text) => navigate('/search?q=' + encodeURIComponent(text));

    return (
        <section className="vbox">
            <section className="scrollable padder-lg w-f-md">
                <div className="m-t-lg m-b-lg">
                    <h2 className="font-thin m-b-xs">{query ? <>Results for “{query}”</> : 'Search music'}</h2>
                    <p className="text-muted">
                        {query
                            ? 'Full-length songs from Audius and 30-second previews of popular songs from iTunes.'
                            : 'Use the search box at the top, or try one of these:'}
                    </p>
                    <div className="search-chips">
                        {suggestions.map((s) => (
                            <button key={s} className={query.toLowerCase() === s.toLowerCase() ? 'ev-chip-btn active' : 'ev-chip-btn'} onClick={() => searchFor(s)}>{s}</button>
                        ))}
                    </div>
                </div>

                <SongSection title={query ? 'Full songs' : 'Trending now'} note="Audius" state={audius}
                    emptyText={`No full songs on Audius match “${query}”.`} />

                {query && (
                    <SongSection title="Popular songs" note="iTunes · 30s previews" state={itunes}
                        emptyText={`No iTunes songs match “${query}”.`} />
                )}

                <p className="text-muted text-xs m-b-lg">
                    Music from <a href="https://audius.co" target="_blank" rel="noreferrer">Audius</a> (full songs, free to stream) and
                    the <a href="https://performance-partners.apple.com/search-api" target="_blank" rel="noreferrer">iTunes Search API</a> (previews © their owners).
                </p>
            </section>
            <JsPlayer />
        </section>
    );
}
