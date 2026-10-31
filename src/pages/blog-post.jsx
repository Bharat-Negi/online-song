import { useEffect, useRef } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar } from '../common-pages/avatar';
import CommentSection from '../common-pages/commentSection';
import useComments from '../common-pages/useComments';
import { deletePost, formatPostDate, readTime, toggleLike, useBlogPosts } from '../common-pages/blogApi';

// /blog/:id: one post with likes, sharing, comments and related posts
export default function BlogPostPage() {
    const { id } = useParams();
    const { hash } = useLocation();
    const navigate = useNavigate();
    const blog = useBlogPosts();
    const comments = useComments('blog-' + id);
    const scrollRef = useRef(null);
    const commentsRef = useRef(null);
    const user = sessionStorage.getItem('username') || '';

    const index = blog.posts.findIndex((p) => String(p.id) === id);
    const post = blog.posts[index];

    // New post: back to the top; "#comments": scroll to the comments
    useEffect(() => {
        if (!post) {
            return;
        }
        if (hash === '#comments' && commentsRef.current) {
            commentsRef.current.scrollIntoView();
        } else if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [id, hash, post]);

    if (blog.status === 'loading') {
        return <section className="scrollable wrapper-lg noJsplayer"><p className="text-muted">Loading post…</p></section>;
    }
    if (blog.status === 'error') {
        return <section className="scrollable wrapper-lg noJsplayer"><p className="text-muted">Could not load the post. Is the json-server running?</p></section>;
    }
    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Posts are newest first: "newer" is the one before, "older" the one after
    const newer = blog.posts[index - 1];
    const older = blog.posts[index + 1];
    // Same category or a shared tag; otherwise simply the latest other posts
    const others = blog.posts.filter((p) => p.id !== post.id);
    const matching = others.filter((p) => p.category === post.category || (p.tags || []).some((t) => (post.tags || []).includes(t)));
    const related = (matching.length > 0 ? matching : others).slice(0, 3);
    const relatedTitle = matching.length > 0 ? 'Related posts' : 'More posts';
    const liked = (post.likes || []).includes(user);
    const isAuthor = post.author === user;

    const like = () => {
        toggleLike(post, user).then(blog.replace).catch(() => toast.error('Could not save your like'));
    };

    const share = () => {
        navigator.clipboard.writeText(`${post.title} – ${window.location.origin}/blog/${post.id}`).then(() => {
            toast.success('Link copied to clipboard');
        }).catch(() => toast.error('Could not copy the link'));
    };

    const remove = () => {
        if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
            deletePost(post.id).then(() => {
                toast.info('Post deleted');
                navigate('/blog');
            }).catch(() => toast.error('Could not delete the post'));
        }
    };

    return (
        <section className="scrollable wrapper-lg noJsplayer blog-page" ref={scrollRef}>
            <div className="row">
                <div className="col-sm-9">
                    <Link to="/blog" className="text-muted"><i className="fa fa-chevron-left m-r-xs"></i>All posts</Link>
                    <article className="blog-post m-t">
                        <div className="blog-post-cover">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="wrapper-lg">
                            <Link to={'/blog?category=' + encodeURIComponent(post.category)} className="blog-chip blog-chip-inline">{post.category}</Link>
                            <h1 className="blog-post-title">{post.title}</h1>
                            <div className="blog-meta m-b-lg">
                                <span className="blog-author">
                                    <span className="blog-author-avatar"><Avatar name={post.author} /></span>
                                    <strong className="text-capitalize">{post.author}</strong>
                                </span>
                                <span><i className="fa fa-clock-o"></i> {formatPostDate(post.date)}{post.edited && ' · edited'} · {readTime(post.content)}</span>
                            </div>
                            <div className="blog-post-body">{post.content}</div>
                            {(post.tags || []).length > 0 && (
                                <div className="m-t-lg">
                                    {post.tags.map((t) => (
                                        <Link key={t} to={'/blog?tag=' + encodeURIComponent(t)} className="label bg-primary m-r-xs">#{t}</Link>
                                    ))}
                                </div>
                            )}
                            <div className="line b-b m-t-lg m-b"></div>
                            <div className="blog-post-actions">
                                <button className={liked ? 'btn btn-rounded blog-like-btn on' : 'btn btn-rounded btn-default blog-like-btn'} onClick={like}>
                                    <i className={liked ? 'fa fa-heart m-r-xs' : 'fa fa-heart-o m-r-xs'}></i>{liked ? 'Liked' : 'Like'} · {(post.likes || []).length}
                                </button>
                                <button className="btn btn-rounded btn-default" onClick={() => commentsRef.current.scrollIntoView({ behavior: 'smooth' })}>
                                    <i className="fa fa-comment-o m-r-xs"></i>{comments.comments.length} comments
                                </button>
                                <button className="btn btn-rounded btn-default" onClick={share}><i className="icon-share m-r-xs"></i>Share</button>
                                {isAuthor && (
                                    <span className="pull-right">
                                        <Link to={`/blog/${post.id}/edit`} className="btn btn-rounded btn-default m-r-xs"><i className="fa fa-pencil m-r-xs"></i>Edit</Link>
                                        <button className="btn btn-rounded btn-default" onClick={remove}><i className="icon-trash m-r-xs"></i>Delete</button>
                                    </span>
                                )}
                            </div>
                        </div>
                    </article>

                    <div className="clearfix m-b">
                        {newer && <Link to={'/blog/' + newer.id} className="btn btn-default btn-rounded"><i className="fa fa-chevron-left m-r-xs"></i>Newer: {newer.title.slice(0, 40)}</Link>}
                        {older && <Link to={'/blog/' + older.id} className="btn btn-default btn-rounded pull-right">Older: {older.title.slice(0, 40)}<i className="fa fa-chevron-right m-l-xs"></i></Link>}
                    </div>

                    <div ref={commentsRef} id="comments">
                        <CommentSection {...comments} />
                    </div>
                </div>

                <div className="col-sm-3">
                    <h5 className="font-bold">About the author</h5>
                    <div className="panel wrapper text-center m-b-lg">
                        <span className="blog-author-big"><Avatar name={post.author} /></span>
                        <strong className="block text-capitalize m-t-sm">{post.author}</strong>
                        <small className="text-muted">{blog.posts.filter((p) => p.author === post.author).length} posts</small>
                    </div>
                    <h5 className="font-bold">{relatedTitle}</h5>
                    {related.length === 0 && <p className="text-muted text-sm">No other posts yet.</p>}
                    {related.map((p) => (
                        <article className="media" key={p.id}>
                            <Link to={'/blog/' + p.id} className="pull-left thumb thumb-wrapper m-t-xs">
                                <img src={p.image} alt={p.title} className="square-thumb" />
                            </Link>
                            <div className="media-body">
                                <Link to={'/blog/' + p.id} className="font-semibold">{p.title}</Link>
                                <div className="text-xs block m-t-xs">{p.category} · {formatPostDate(p.date)}</div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
