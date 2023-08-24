import JsPlayer from '../common-pages/jsPlayer'
import Connected from '../common-pages/connected'

export default function whatsNew() {
    return (
        <section>
            <section className="hbox stretch">
                <section>
                    <section className="vbox">
                        <section className="scrollable padder-lg w-f-md">
                            <a href="#" className="pull-right text-muted m-t-lg">
                                <i className="icon-refresh i-lg  inline" id="refresh"></i>
                            </a>
                            <h2 className="font-thin m-b">
                                Discover <span className="musicbar animate inline m-l-sm" style={{ width: '20px', height: '20px' }}>
                                    <span className="bar1 a1 bg-primary lter"></span>
                                    <span className="bar2 a2 bg-info lt"></span>
                                    <span className="bar3 a3 bg-success"></span>
                                    <span className="bar4 a4 bg-warning dk"></span>
                                    <span className="bar5 a5 bg-danger dker"></span>
                                </span>
                            </h2>
                            <div className="row row-sm">
                                <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                                    <div className="item">
                                        <div className="pos-rlt">
                                            <div className="bottom">
                                                <span className="badge bg-info m-l-sm m-b-sm">03:20</span>
                                            </div>
                                            <div className="item-overlay opacity r r-2x bg-black">
                                                <div className="text-info padder m-t-sm text-sm">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o text-muted"></i>
                                                </div>
                                                <div className="center text-center m-t-n">
                                                    <a href="#"><i className="icon-control-play i-2x"></i></a>
                                                </div>
                                                <div className="bottom padder m-b-sm">
                                                    <a href="#" className="pull-right">
                                                        <i className="fa fa-heart-o"></i>
                                                    </a>
                                                    <a href="#">
                                                        <i className="fa fa-plus-circle"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <a href="#"><img src="images/p1.jpg" alt="" className="r r-2x img-full" /></a>
                                        </div>
                                        <div className="padder-v">
                                            <a href="#" className="text-ellipsis">Tempered Song</a>
                                            <a href="#" className="text-ellipsis text-xs text-muted">Miaow</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                                    <div className="item">
                                        <div className="pos-rlt">
                                            <div className="item-overlay opacity r r-2x bg-black active">
                                                <div className="text-info padder m-t-sm text-sm">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o text-muted"></i>
                                                    <i className="fa fa-star-o text-muted"></i>
                                                </div>
                                                <div className="center text-center m-t-n">
                                                    <a href="#" data-toggle="class">
                                                        <i className="icon-control-play i-2x text"></i>
                                                        <i className="icon-control-pause i-2x text-active"></i>
                                                    </a>
                                                </div>
                                                <div className="bottom padder m-b-sm">
                                                    <a href="#" className="pull-right active" data-toggle="class">
                                                        <i className="fa fa-heart-o text"></i>
                                                        <i className="fa fa-heart text-active text-danger"></i>
                                                    </a>
                                                    <a href="#" data-toggle="class">
                                                        <i className="fa fa-plus-circle text"></i>
                                                        <i className="fa fa-check-circle text-active text-info"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <a href="#"><img src="images/p2.jpg" alt="" className="r r-2x img-full" /></a>
                                        </div>
                                        <div className="padder-v">
                                            <a href="#" className="text-ellipsis">Vivamus vel tincidunt libero</a>
                                            <a href="#" className="text-ellipsis text-xs text-muted">Lauren Taylor</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="clearfix visible-xs"></div>

                                <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                                    <div className="item">
                                        <div className="pos-rlt">
                                            <div className="item-overlay opacity r r-2x bg-black">
                                                <div className="text-info padder m-t-sm text-sm">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o text-muted"></i>
                                                </div>
                                                <div className="center text-center m-t-n">
                                                    <a href="#"><i className="icon-control-play i-2x"></i></a>
                                                </div>
                                                <div className="bottom padder m-b-sm">
                                                    <a href="#" className="pull-right">
                                                        <i className="fa fa-heart-o"></i>
                                                    </a>
                                                    <a href="#">
                                                        <i className="fa fa-plus-circle"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <a href="#"><img src="images/p3.jpg" alt="" className="r r-2x img-full" /></a>
                                        </div>
                                        <div className="padder-v">
                                            <a href="#" className="text-ellipsis">Morbi id neque quam liquam sollicitudin</a>
                                            <a href="#" className="text-ellipsis text-xs text-muted">Allen JH</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-7">
                                    <h3 className="font-thin">New Songs</h3>
                                    <div className="row row-sm">
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a2.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Spring rain</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Miaow</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a3.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Hope</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Miya</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a8.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Listen wind</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Soyia Jess</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a9.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Breaking me</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Pett JA</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a1.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Nothing</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Willion</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a6.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Panda Style</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Lionie</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a7.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Hook Me</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Gossi</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-3">
                                            <div className="item">
                                                <div className="pos-rlt">
                                                    <div className="item-overlay opacity r r-2x bg-black">
                                                        <div className="center text-center m-t-n">
                                                            <a href="#"><i className="fa fa-play-circle i-2x"></i></a>
                                                        </div>
                                                    </div>
                                                    <a href="#"><img src="images/a5.png" alt="" className="r r-2x img-full" /></a>
                                                </div>
                                                <div className="padder-v">
                                                    <a href="#" className="text-ellipsis">Tempered Song</a>
                                                    <a href="#" className="text-ellipsis text-xs text-muted">Miaow</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <h3 className="font-thin">Top Songs</h3>
                                    <div className="list-group bg-white list-group-lg no-bg auto">
                                        <a href="#" className="list-group-item clearfix">
                                            <span className="pull-right h2 text-muted m-l">1</span>
                                            <span className="pull-left thumb-sm avatar m-r">
                                                <img src="images/a4.png" alt="..." />
                                            </span>
                                            <span className="clear">
                                                <span>Little Town</span>
                                                <small className="text-muted clear text-ellipsis">by Chris Fox</small>
                                            </span>
                                        </a>
                                        <a href="#" className="list-group-item clearfix">
                                            <span className="pull-right h2 text-muted m-l">2</span>
                                            <span className="pull-left thumb-sm avatar m-r">
                                                <img src="images/a5.png" alt="..." />
                                            </span>
                                            <span className="clear">
                                                <span>Lementum ligula vitae</span>
                                                <small className="text-muted clear text-ellipsis">by Amanda Conlan</small>
                                            </span>
                                        </a>
                                        <a href="#" className="list-group-item clearfix">
                                            <span className="pull-right h2 text-muted m-l">3</span>
                                            <span className="pull-left thumb-sm avatar m-r">
                                                <img src="images/a6.png" alt="..." />
                                            </span>
                                            <span className="clear">
                                                <span>Aliquam sollicitudin venenatis</span>
                                                <small className="text-muted clear text-ellipsis">by Dan Doorack</small>
                                            </span>
                                        </a>
                                        <a href="#" className="list-group-item clearfix">
                                            <span className="pull-right h2 text-muted m-l">4</span>
                                            <span className="pull-left thumb-sm avatar m-r">
                                                <img src="images/a7.png" alt="..." />
                                            </span>
                                            <span className="clear">
                                                <span>Aliquam sollicitudin venenatis ipsum</span>
                                                <small className="text-muted clear text-ellipsis">by Lauren Taylor</small>
                                            </span>
                                        </a>
                                        <a href="#" className="list-group-item clearfix">
                                            <span className="pull-right h2 text-muted m-l">5</span>
                                            <span className="pull-left thumb-sm avatar m-r">
                                                <img src="images/a8.png" alt="..." />
                                            </span>
                                            <span className="clear">
                                                <span>Vestibulum ullamcorper</span>
                                                <small className="text-muted clear text-ellipsis">by Dan Doorack</small>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-t-lg m-b-lg">
                                <div className="col-sm-6">
                                    <div className="bg-primary wrapper-md r">
                                        <a href="#">
                                            <span className="h4 m-b-xs block"><i className=" icon-user-follow i-lg"></i> Login or Create account</span>
                                            <span className="text-muted">Save and share your playlist with your friends when you log in or create an account.</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="bg-black wrapper-md r">
                                        <a href="#">
                                            <span className="h4 m-b-xs block"><i className="icon-cloud-download i-lg"></i> Download our app</span>
                                            <span className="text-muted">Get the apps for desktop and mobile to start listening music at anywhere and anytime.</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <JsPlayer />                           
                    </section>                     
                </section>
                <Connected />
            </section>
        </section>
    )
}