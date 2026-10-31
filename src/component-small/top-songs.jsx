import { usePlayer } from '../common-pages/playerContext'
import { topSongs } from '../common-pages/songCatalog'

const maxPlays = Math.max(...topSongs.map((song) => song.plays));

// 2480000 -> "2.5M", 980000 -> "980K"
const shortNumber = (n) => n >= 1000000 ? (n / 1000000).toFixed(1).replace('.0', '') + 'M' : Math.round(n / 1000) + 'K';

// Arrow, colour and tooltip for the chart movement
const trendInfo = (song) => {
    if (song.trend === 'new') {
        return { label: 'NEW', className: 'tc-trend-new', title: 'New entry this week' };
    }
    if (song.trend === 'up') {
        return { label: '▲', className: 'tc-trend-up', title: `Up from #${song.lastWeek}` };
    }
    if (song.trend === 'down') {
        return { label: '▼', className: 'tc-trend-down', title: `Down from #${song.lastWeek}` };
    }
    return { label: '–', className: 'tc-trend-same', title: 'Same as last week' };
};

export default function TopSongs() {
    const player = usePlayer();
    const isChartPlaying = player.isPlaying && topSongs.some((song) => song.id === player.current.id);

    // Pause if the chart is playing, otherwise play it from #1
    const playAll = () => {
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
                                <img src={song.image} alt={song.name} />
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
                                <span className="tc-bar" title={`${song.plays.toLocaleString('en-IN')} plays this week`}>
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
