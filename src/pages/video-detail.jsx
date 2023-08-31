export default function VideoDetailPage() {
    return(
        <>
            <section className="scrollable wrapper-lg noJsplayer">
              <div className="row">
                <div className="col-sm-8">
                  <div className="panel">
                    <div id="jp_container_1">
                      <div className="jp-type-single pos-rlt">
                        <div id="jplayer_1" className="jp-jplayer jp-video"></div>
                        <div className="jp-gui">
                          <div className="jp-video-play">
                            <a className="fa fa-5x text-white fa-play-circle"></a>
                          </div>
                          <div className="jp-interface bg-info padder">
                            <div className="jp-controls">
                              <div>
                                <a className="jp-play"><i className="icon-control-play i-2x"></i></a>
                                <a className="jp-pause hid"><i className="icon-control-pause i-2x"></i></a>
                              </div>
                              <div className="jp-progress">
                                <div className="jp-seek-bar dker">
                                  <div className="jp-play-bar dk">
                                  </div>
                                  <div className="jp-title text-lt">
                                    <ul>
                                      <li></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="hidden-xs hidden-sm jp-current-time text-xs text-muted"></div>
                              <div className="hidden-xs hidden-sm jp-duration text-xs text-muted"></div>
                              <div className="hidden-xs hidden-sm">
                                <a className="jp-mute" title="mute"><i className="icon-volume-2"></i></a>
                                <a className="jp-unmute hid" title="unmute"><i className="icon-volume-off"></i></a>
                              </div>
                              <div className="hidden-xs hidden-sm jp-volume">
                                <div className="jp-volume-bar dk">
                                  <div className="jp-volume-bar-value lter"></div>
                                </div>
                              </div>
                              <div>
                                <a className="jp-full-screen" title="full screen"><i className="fa fa-expand"></i></a>
                                <a className="jp-restore-screen" title="restore screen"><i className="fa fa-compress text-lt"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="jp-no-solution hide">
                          <span>Update Required</span>
                          To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                        </div>
                      </div>
                    </div>
                    <div className="wrapper-lg">
                      <h2 className="m-t-none text-black">Big Buck Bunny Trailer</h2>
                      <div className="post-sum">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum ullamcorper sodales nisi nec condimentum. Mauris convallis mauris at pellentesque volutpat. 
                        <br /><br />
                        Phasellus at ultricies neque, quis malesuada augue. Donec eleifend condimentum nisl eu consectetur. Integer eleifend, nisl venenatis consequat iaculis, lectus arcu malesuada sem, dapibus porta quam lacus eu neque.</p>
                      </div>
                      <div className="line b-b"></div>
                      <div className="text-muted">
                        <i className="fa fa-user icon-muted"></i> by <a href="#" className="m-r-sm">Admin</a>
                        <i className="fa fa-clock-o icon-muted"></i> Feb 20, 2013
                        <a href="#" className="m-l-sm"><i className="fa fa-comment-o icon-muted"></i> 3 comments</a>
                      </div>
                    </div>
                  </div>
                  <h4 className="m-t-lg m-b">3 Comments</h4>
                  <section className="comment-list block">
                    <article id="comment-id-1" className="comment-item">
                      <a className="pull-left thumb-sm">
                        <img src="images/a0.png" className="img-circle" />
                      </a>
                      <section className="comment-body m-b">
                        <header>
                          <a href="#"><strong>John smith</strong></a>
                          <label className="label bg-info m-l-xs">Editor</label> 
                          <span className="text-muted text-xs block m-t-xs">
                            24 minutes ago
                          </span>
                        </header>
                        <div className="m-t-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum.</div>
                      </section>
                    </article>
                    
                    <article id="comment-id-2" className="comment-item comment-reply">
                      <a className="pull-left thumb-sm">
                        <img src="images/a1.png" className="img-circle" />
                      </a>
                      <section className="comment-body m-b">
                        <header>
                          <a href="#"><strong>John smith</strong></a>
                          <label className="label bg-dark m-l-xs">Admin</label> 
                          <span className="text-muted text-xs block m-t-xs">
                            26 minutes ago
                          </span>
                        </header>
                        <div className="m-t-sm">Lorem ipsum dolor sit amet, consecteter adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.</div>
                      </section>
                    </article>
                   
                    <article id="comment-id-2" className="comment-item">
                      <a className="pull-left thumb-sm">
                        <img src="images/a2.png" className="img-circle" />
                      </a>
                      <section className="comment-body m-b">
                        <header>
                          <a href="#"><strong>John smith</strong></a>
                          <label className="label bg-dark m-l-xs">Admin</label> 
                          <span className="text-muted text-xs block m-t-xs">
                            26 minutes ago
                          </span>
                        </header>
                        <blockquote className="m-t">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                          <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                        </blockquote>
                        <div className="m-t-sm">Lorem ipsum dolor sit amet, consecteter adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.</div>
                      </section>
                    </article>
                  </section>
                  <h4 className="m-t-lg m-b">Leave a comment</h4>
                  <form>
                    <div className="form-group pull-in clearfix">
                      <div className="col-sm-6">
                        <label>Your name</label>
                        <input type="text" className="form-control" placeholder="Name" />
                      </div>
                      <div className="col-sm-6">
                        <label >Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Comment</label>
                      <textarea className="form-control" rows="5" placeholder="Type your comment"></textarea>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-success">Submit comment</button>
                    </div>
                  </form>
                </div>
                <div className="col-sm-4">
                  <div className="panel panel-default">
                    <div className="panel-heading">Suggestions</div>
                    <div className="panel-body">
                      <article className="media">
                        <a href="#" className="pull-left thumb-lg m-t-xs">
                          <img src="images/m40.jpg" />
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Bootstrap 3: What you need to know</a>
                          <div className="text-xs block m-t-xs"><a href="#">Travel</a> 2 minutes ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-lg m-t-xs">
                          <img src="images/m41.jpg" />
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Lorem ipsum dolor sit amet it.</a>
                          <div className="text-xs block m-t-xs"><a href="#">Design</a> 2 hours ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-lg m-t-xs">
                          <img src="images/m42.jpg" />
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Sed diam nonummy tincidunt ut laoreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-lg m-t-xs">
                          <img src="images/m43.jpg" />
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Lonummy nibh euismod sed laoreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-lg m-t-xs">
                          <img src="images/m44.jpg" />
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Mibh euismod tincidunt ut laoreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                      <article className="media">
                        <a href="#" className="pull-left thumb-lg m-t-xs">
                          <img src="images/m45.jpg" />
                        </a>
                        <div className="media-body">                        
                          <a href="#" className="font-semibold">Siam nonummy nibh oreet</a>
                          <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </>
    )
}