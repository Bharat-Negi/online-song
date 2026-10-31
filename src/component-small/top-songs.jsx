import { usePlayer } from '../common-pages/playerContext'
import { audiusChart, useApiSongs, onCoverError } from '../common-pages/musicApi'


// 2480000 -> "2.5M", 980000 -> "980K", 640 -> "640"
const shortNumber = (n) => n >= 1000000 ? (n / 1000000).toFixed(1).replace('.0', '') + 'M' : n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.0', '') + 'K' : String(n);

// Arrow, colour and tooltip for the chart movement
const trendInfo = (song) => {
    if (song.trend === 'new') {
        return { label: 'NEW', className: 'tc-trend-new', title: 'New entry this week' };
    }
    if (song.trend === 'up') {
        return { label: '▲', className: 'tc-trend-up', title: `Up from #${song.lastWeek} this month` };
    }
    if (song.trend === 'down') {
        return { label: '▼', className: 'tc-trend-down', title: `Down from #${song.lastWeek} this month` };
    }
    return { label: '–', className: 'tc-trend-same', title: 'Same position as this month' };
};

export default function TopSongs() {
    const player = usePlayer();
    // This week's most-trending full songs on Audius, with real play counts
    const chart = useApiSongs(() => audiusChart(5), 'top-songs');
    const topSongs = chart.songs;
    const maxPlays = Math.max(1, ...topSongs.map((song) => song.plays));
    const isChartPlaying = player.isPlaying && topSongs.some((song) => song.id === player.current.id);

    // Pause if the chart is playing, otherwise play it from #1
    const playAll = () => {
        if (topSongs.length === 0) {
            return;
        }
        const playing = isChartPlaying && topSongs.find((song) => song.id === player.current.id);
        player.toggleSong(playing || topSongs[0], topSongs);
    };

    return (
        <div className="col-md-5">
            <div className="tc-head">
                <h3 className="font-thin">Top Songs</h3>
                <span className="tc-week">This week</span>
                <button className="tc-play-all" onClick={playAll} title={isChartPlaying ? 'Pause' : 'Play the chart'}>
                    <i className={isChartPlaying ? "fa fa-pause" : "fa fa-play"}></i>
                </button>
            </div>
            <div className="tc-list">
                {chart.status === 'loading' && topSongs.length === 0 && <p className="text-muted padder m-t m-b">Loading this week's chart…</p>}
                {chart.status === 'error' && <p className="text-muted padder m-t m-b">Could not load the chart. Check your internet connection.</p>}
                {topSongs.map((song) => {
                    const isPlaying = player.isSongPlaying(song.id);
                    const isCurrent = player.current.id === song.id;
                    const trend = trendInfo(song);
                    return (
                        <div className={isCurrent ? "tc-row tc-current" : "tc-row"} key={song.id}
                            onClick={() => player.toggleSong(song, topSongs)} title={isPlaying ? 'Pause' : 'Play'}>
                            <div className={`tc-rank tc-rank-${song.rank}`}>
                                <span>{song.rank}</span>
                                <small className={trend.className} title={trend.title}>{trend.label}</small>
                            </div>
                            <div className="tc-cover">
                                <img src={song.image} alt={song.name} className="cover-loading" onError={onCoverError} />
                                <span className="tc-cover-btn">
                                    {isPlaying ? (
                                        <span className="musicbar animate tc-bars">
                                            <span className="bar1 a1 bg-white"></span>
                                            <span className="bar2 a2 bg-white"></span>
                                            <span className="bar3 a3 bg-white"></span>
                                            <span className="bar4 a4 bg-white"></span>
                                            <span className="bar5 a5 bg-white"></span>
                                        </span>
                                    ) : (
                                        <i className="fa fa-play"></i>
                                    )}
                                </span>
                            </div>
                            <div className="tc-info">
                                <span className="tc-name text-ellipsis">{song.name}</span>
                                <span className="tc-artist text-ellipsis">{song.artist}</span>
                                <span className="tc-bar" title={`${song.plays.toLocaleString('en-IN')} plays`}>
                                    <span style={{ width: (song.plays / maxPlays) * 100 + '%' }}></span>
                                </span>
                            </div>
                            <div className="tc-stats">
                                <span className="tc-plays">{shortNumber(song.plays)}</span>
                                <span className="tc-time">{song.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
