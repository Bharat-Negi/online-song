import { Link } from "react-router-dom";
import VideoListData from '../json-data/video-list.json';
import VideoTopData from '../json-data/video-top.json';

export default function Video() {
    return (
        <>
            <section className="scrollable padder-lg noJsplayer">
                <h2 className="font-thin m-b">Video</h2>
                <div className="row row-sm">
                    {
                        VideoTopData && VideoTopData.slice(0,3).map((videotop, id) => {
                            return (
                                <div className="col-xs-12 col-sm-4" key={id}>
                                    <div className="item">
                                        <div className="pos-rlt">
                                            <div className="item-overlay opacity r r-2x bg-black">
                                                <div className="center text-center m-t-n">
                                                    <Link to={videotop.vidLink}>
                                                        <i className="fa fa-play-circle i-2x"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="top">
                                                <span className="badge bg-dark m-l-sm m-t-sm">{videotop.vidTime}</span>
                                            </div>
                                            <Link to={videotop.vidLink}>
                                                <img src={videotop.vidImg} alt="" className="r r-2x img-full" />
                                            </Link>
                                        </div>
                                        <div className="padder-v">
                                            <Link to={videotop.vidLink} className="text-ellipsis">
                                                {videotop.vidName}
                                            </Link>
                                            <Link to={videotop.vidLink} className="text-ellipsis">
                                                {videotop.vidCast}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <h3 className="font-thin m-b">Video List</h3>
                <div className="row row-sm">
                    {
                        VideoListData && VideoListData.map((video, id) => {
                            return (
                                <div className="col-xs-6 col-sm-4 col-md-3" key={id}>
                                    <div className="item">
                                        <div className="pos-rlt">
                                            <div className="item-overlay opacity r r-2x bg-black">
                                                <div className="center text-center m-t-n">
                                                    <Link to={video.vidLink}>
                                                        <i className="fa fa-play-circle i-2x"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Link to={video.vidLink}>
                                                <img src={video.vidImg} alt="" className="r r-2x img-full" />
                                            </Link>
                                        </div>
                                        <div className="padder-v">
                                            <Link to={video.vidLink} className="text-ellipsis">
                                                {video.vidName}
                                            </Link>
                                            <Link to={video.vidLink} className="text-ellipsis text-xs text-muted">
                                                {video.vidCast}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <ul className="pagination pagination">
                    <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
                </ul>
            </section>
        </>
    )
}