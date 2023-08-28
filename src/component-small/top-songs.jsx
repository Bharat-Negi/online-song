import TopSongdb from '../json-data/top-song.json'

export default function TopSongs() {
    return (
        <div className="col-md-5">
            <h3 className="font-thin">Top Songs</h3>
            <div className="list-group bg-white list-group-lg no-bg auto">
                {
                    TopSongdb && TopSongdb.map(TopSongdb => {
                        return (
                            <a href={TopSongdb.topUrl} className="list-group-item" key={TopSongdb.id}>
                                <span className="pull-right h2 text-muted m-l">{TopSongdb.id}</span>
                                <span className="pull-left thumb-sm avatar m-r">
                                    <img src={TopSongdb.topImg} alt="..." />
                                </span>
                                <span className="clear">
                                    <span className="topSongName">{TopSongdb.topName}</span>
                                    <small className="text-muted clear text-ellipsis">by {TopSongdb.topArtist}</small>
                                </span>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}