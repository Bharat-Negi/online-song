import NewSongdb from '../json-data/new-song.json'

export default function NewSongs() {
    return (
        <>
            <div className="col-md-7">
                <h3 className="font-thin">New Songs</h3>
                <div className="row row-sm">
                    {
                        NewSongdb && NewSongdb.slice(0,5).map(NewSongdb => {
                            return (
                                <div className="col-xs-6 col-sm-3" key={NewSongdb.id}>
                                    <div className="item">
                                        <div className="pos-rlt">
                                            <div className="item-overlay opacity r r-2x bg-black">
                                                <div className="center text-center m-t-n">
                                                    <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                </div>
                                            </div>
                                            <a href="#"><img src={NewSongdb.newImg} alt="" className="r r-2x img-full" /></a>
                                        </div>
                                        <div className="padder-v">
                                            <a href="#" className="text-ellipsis">{NewSongdb.newName}</a>
                                            <a href="#" className="text-ellipsis text-xs text-muted">{NewSongdb.newArtist}</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}