import { Link } from "react-router-dom";

export default function Video() {
    return (
        <>
            <section className="scrollable padder-lg noJsplayer">
                <h2 className="font-thin m-b">Video</h2>
                <div className="row row-sm">
                    <div className="col-xs-12 col-sm-4">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <Link to='/video-detail'>
                                            <i className="fa fa-play-circle i-2x"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="top">
                                    <span className="badge bg-dark m-l-sm m-t-sm">03:20</span>
                                </div>
                                <Link to='/video-detail'>
                                    <img src="images/m40.jpg" alt="" className="r r-2x img-full" />
                                </Link>
                            </div>
                            <div className="padder-v">
                                <Link to='/video-detail' className="text-ellipsis">Tempered Song</Link>
                                <Link to='/video-detail' className="text-ellipsis">Miaow</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <div className="top">
                                    <span className="badge bg-dark m-l-sm m-t-sm">02:10</span>
                                </div>
                                <a href="video-detail.html"><img src="images/m41.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Morbi id neque quam</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Phasellus</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <div className="top">
                                    <span className="badge bg-dark m-l-sm m-t-sm">05:40</span>
                                </div>
                                <a href="video-detail.html"><img src="images/m42.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Aliquam sollicitudin venenatis ipsum</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Malesuada</a>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="font-thin m-b">Video List</h3>
                <div className="row row-sm">
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m40.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Tempered Song</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Miaow</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m41.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Morbi id neque quam</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Phasellus</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m42.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Aliquam sollicitudin venenatis ipsum</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Malesuada</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m43.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Citudin venenatis ipsum ac</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Volutpat</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m44.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Vestibulum ullamcorper sodales nisi</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Mauris Qiaos</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m40.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Mauris convallis mauris at</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Neque</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m45.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Sodales nisi nec condimentum</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Augue</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m44.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Nisi nec condimentum</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Miaow</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m43.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Phasellus at ultricies nequ</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Volutpat</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m42.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Quis malesuada augue</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Feugiat</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m41.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Ipsum ac feugiat</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Quam AC</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="item">
                            <div className="pos-rlt">
                                <div className="item-overlay opacity r r-2x bg-black">
                                    <div className="center text-center m-t-n">
                                        <a href="video-detail.html"><i className="fa fa-play-circle i-2x"></i></a>
                                    </div>
                                </div>
                                <a href="video-detail.html"><img src="images/m40.jpg" alt="" className="r r-2x img-full" /></a>
                            </div>
                            <div className="padder-v">
                                <a href="video-detail.html" className="text-ellipsis">Ullamcorper sodales nisi nec condimentu</a>
                                <a href="video-detail.html" className="text-ellipsis text-xs text-muted">Convallis</a>
                            </div>
                        </div>
                    </div>
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