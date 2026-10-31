import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar } from '../common-pages/avatar';
import { categories, excerpt, formatPostDate, readTime, toggleLike, useBlogPosts } from '../common-pages/blogApi';

const PAGE_SIZE = 4;

// /blog: all posts with search, category and tag filters (?category=Tips&tag=Audius)
export default function BlogPage() {
    const blog = useBlogPosts();
    const [params, setParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const user = sessionStorage.getItem('username') || '';

    const category = params.get('category') || '';
    const tag = params.get('tag') || '';
    const setFilter = (key, value) => {
        const next = new URLSearchParams(params);
        value ? next.set(key, value) : next.delete(key);
        setParams(next);
        setPage(1);
    };

    const query = search.trim().toLowerCase();
    const posts = blog.posts.filter((p) =>
        (!category || p.category === category) &&
        (!tag || (p.tags || []).includes(tag)) &&
        (p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query) || p.author.toLowerCase().includes(query))
    );
    const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagePosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const allTags = [...new Set(blog.posts.flatMap((p) => p.tags || []))].sort();
    const countIn = (c) => blog.posts.filter((p) => p.category === c).length;

    const like = (post) => {
        toggleLike(post, user).then(blog.replace).catch(() => toast.error('Could not save your like'));
    };

    const goTo = (e, n) => {
        e.preventDefault();
        if (n >= 1 && n <= pageCount) {
            setPage(n);
        }
    };

    return (
        <section className="scrollable wrapper-lg noJsplayer blog-page">
            <div className="clearfix m-b">
                <Link to="/blog/new" className="btn btn-info btn-rounded pull-right"><i className="fa fa-pencil m-r-xs"></i>Write a post</Link>
                <h2 className="font-thin m-t-none m-b-xs">Blog</h2>
                <span className="text-muted">
                    News, tips and stories from the Online Song community
                    {(category || tag) && (
                        <> · showing <strong>{category || '#' + tag}</strong> <a className="cus-hand text-info" onClick={() => { setParams({}); setPage(1); }}>(clear)</a></>
                    )}
                </span>
            </div>
            <div className="row">
                <div className="col-sm-9">
                    {blog.status === 'loading' && <p className="text-muted">Loading posts…</p>}
                    {blog.status === 'error' && <p className="text-muted"><i className="fa fa-exclamation-circle m-r-xs"></i>Could not load posts. Is the json-server running?</p>}
                    {blog.status === 'ok' && pagePosts.length === 0 && (
                        <div className="pl-empty">
                            <i className="icon-note"></i>
                            <h4>No posts found</h4>
                            <p className="text-muted">Try another search or category, or write the first one.</p>
                            <Link to="/blog/new" className="btn btn-info btn-rounded">Write a post</Link>
                        </div>
                    )}
                    {pagePosts.map((post) => {
                        const liked = (post.likes || []).includes(user);
                        return (
                            <article className="blog-card" key={post.id}>
                                <Link to={'/blog/' + post.id} className="blog-card-cover">
                                    <img src={post.image} alt={post.title} />
                                    <span className="blog-chip">{post.category}</span>
                                </Link>
                                <div className="blog-card-body">
                                    <Link to={'/blog/' + post.id} className="blog-card-title">{post.title}</Link>
                                    <p className="text-muted">{excerpt(post.content)}</p>
                                    <div className="blog-meta">
                                        <span className="blog-author">
                                            <span className="blog-author-avatar"><Avatar name={post.author} /></span>
                                            <strong className="text-capitalize">{post.author}</strong>
                                        </span>
                                        <span><i className="fa fa-clock-o"></i> {formatPostDate(post.date)} · {readTime(post.content)}</span>
                                        <span className="blog-actions">
                                            <a className={liked ? 'cus-hand blog-like on' : 'cus-hand blog-like'} onClick={() => like(post)} title={liked ? 'Unlike' : 'Like'}>
                                                <i className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}></i> {(post.likes || []).length}
                                            </a>
                                            <Link to={'/blog/' + post.id + '#comments'}><i className="fa fa-comment-o"></i> {blog.comments['blog-' + post.id] || 0}</Link>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                    {pageCount > 1 && (
                        <ul className="pagination pagination-md">
                            <li className={currentPage === 1 ? 'disabled' : ''}><a href="#" onClick={(e) => goTo(e, currentPage - 1)}><i className="fa fa-chevron-left"></i></a></li>
                            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                                <li key={n} className={n === currentPage ? 'active' : ''}><a href="#" onClick={(e) => goTo(e, n)}>{n}</a></li>
                            ))}
                            <li className={currentPage === pageCount ? 'disabled' : ''}><a href="#" onClick={(e) => goTo(e, currentPage + 1)}><i className="fa fa-chevron-right"></i></a></li>
                        </ul>
                    )}
                </div>

                <div className="col-sm-3">
                    <div className="blog-search m-b">
                        <i className="fa fa-search"></i>
                        <input type="text" className="form-control" placeholder="Search posts..." value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                    </div>
                    <h5 className="font-bold">Categories</h5>
                    <ul className="list-group">
                        {categories.map((c) => (
                            <li className={category === c ? 'list-group-item active' : 'list-group-item'} key={c}>
                                <a className="cus-hand" onClick={() => setFilter('category', category === c ? '' : c)}>
                                    <span className="badge pull-right">{countIn(c)}</span>
                                    {c}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {allTags.length > 0 && (
                        <>
                            <h5 className="font-bold">Tags</h5>
                            <div className="tags m-b-lg l-h-2x">
                                {allTags.map((t) => (
                                    <a key={t} className={tag === t ? 'label bg-info m-r-xs cus-hand' : 'label bg-primary m-r-xs cus-hand'}
                                        onClick={() => setFilter('tag', tag === t ? '' : t)}>{t}</a>
                                ))}
                            </div>
                        </>
                    )}
                    <h5 className="font-bold">Recent posts</h5>
                    {blog.posts.slice(0, 3).map((p) => (
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
