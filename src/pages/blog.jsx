import CommentSection from '../common-pages/commentSection';
import useComments from '../common-pages/useComments';

export default function BlogPage() {
    const comments = useComments('blog');

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
                            <CommentSection {...comments} />
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