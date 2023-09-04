export default function BlogPage() {
    return (
        <>
            <section className="scrollable wrapper-lg noJsplayer">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post">
                            <div className="post-item">
                                <div className="post-media">
                                    <img src="images/m42.jpg" className="img-full" />
                                </div>
                                <div className="caption wrapper-lg">
                                    <h2 className="post-title"><a href="#">7 things you need to know about the flat design</a></h2>
                                    <div className="post-sum">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum ullamcorper sodales nisi nec condimentum. Mauris convallis mauris at pellentesque volutpat.
                                            <br /><br />
                                                Phasellus at ultricies neque, quis malesuada augue. Donec eleifend condimentum nisl eu consectetur. Integer eleifend, nisl venenatis consequat iaculis, lectus arcu malesuada sem, dapibus porta quam lacus eu neque.</p>
                                            </div>
                                            <div className="line line-lg"></div>
                                            <div className="text-muted">
                                                <i className="fa fa-user icon-muted"></i> by <a href="#" className="m-r-sm">Admin</a>
                                                <i className="fa fa-clock-o icon-muted"></i> Feb 20, 2013
                                                <a href="#" className="m-l-sm"><i className="fa fa-comment-o icon-muted"></i> 2 comments</a>
                                            </div>
                                    </div>
                                </div>
                                <div className="post-item">
                                    <div className="caption wrapper-lg">
                                        <h2 className="post-title"><a href="#">Bootstrap 3: What you need to know</a></h2>
                                        <div className="post-sum">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum ullamcorper sodales nisi nec condimentum. Mauris convallis mauris at pellentesque volutpat.
                                            </p>
                                            <h3>Html5 and CSS3</h3>
                                            <p>
                                                Phasellus at ultricies neque, quis malesuada augue. Donec eleifend condimentum nisl eu consectetur. Integer eleifend, nisl venenatis consequat iaculis, lectus arcu malesuada sem, dapibus porta quam lacus eu neque.</p>
                                        </div>
                                        <div className="line line-lg"></div>
                                        <div className="text-muted">
                                            <i className="fa fa-user icon-muted"></i> by <a href="#" className="m-r-sm">Admin</a>
                                            <i className="fa fa-clock-o icon-muted"></i> Feb 15, 2013
                                            <a href="#" className="m-l-sm"><i className="fa fa-comment-o icon-muted"></i> 4 comments</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center m-t-lg m-b-lg">
                                <ul className="pagination pagination-md">
                                    <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
                                </ul>
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
                        <div className="col-sm-3">
                            <h5 className="font-bold">Categories</h5>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <a href="#">
                                        <span className="badge pull-right">15</span>
                                        Photograph
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#">
                                        <span className="badge pull-right">30</span>
                                        Life style
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#">
                                        <span className="badge pull-right">9</span>
                                        Food
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#">
                                        <span className="badge pull-right">4</span>
                                        Travel world
                                    </a>
                                </li>
                            </ul>
                            <div className="tags m-b-lg l-h-2x">
                                <a href="#" className="label bg-primary">Bootstrap</a> <a href="#" className="label bg-primary">Application</a> <a href="#" className="label bg-primary">Apple</a> <a href="#" className="label bg-primary">Less</a> <a href="#" className="label bg-primary">Theme</a> <a href="#" className="label bg-primary">Wordpress</a>
                            </div>
                            <h5 className="font-bold">Recent Posts</h5>
                            <div>
                                <article className="media">
                                    <a className="pull-left thumb thumb-wrapper m-t-xs">
                                        <img src="images/m1.jpg" />
                                    </a>
                                    <div className="media-body">
                                        <a href="#" className="font-semibold">Bootstrap 3: What you need to know</a>
                                        <div className="text-xs block m-t-xs"><a href="#">Travel</a> 2 minutes ago</div>
                                    </div>
                                </article>
                                <div className="line"></div>
                                <article className="media m-t-none">
                                    <a className="pull-left thumb thumb-wrapper m-t-xs">
                                        <img src="images/m2.jpg" />
                                    </a>
                                    <div className="media-body">
                                        <a href="#" className="font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a>
                                        <div className="text-xs block m-t-xs"><a href="#">Design</a> 2 hours ago</div>
                                    </div>
                                </article>
                                <div className="line"></div>
                                <article className="media m-t-none">
                                    <a className="pull-left thumb thumb-wrapper m-t-xs">
                                        <img src="images/m3.jpg" />
                                    </a>
                                    <div className="media-body">
                                        <a href="#" className="font-semibold">Sed diam nonummy nibh euismod tincidunt ut laoreet</a>
                                        <div className="text-xs block m-t-xs"><a href="#">MFC</a> 1 week ago</div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}