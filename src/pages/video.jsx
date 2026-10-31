import { useState } from 'react';
import { Link } from "react-router-dom";
import VideoData from '../json-data/videos.json';

const PAGE_SIZE = 4;
const categories = ['All', ...new Set(VideoData.map((video) => video.category))];

// One video card; "large" is used for the featured row
function VideoCard({ video, large }) {
    const link = '/video/' + video.id;
    return (
        <div className="item">
            <div className="pos-rlt">
                <div className="item-overlay opacity r r-2x bg-black">
                    <div className="center text-center m-t-n">
                        <Link to={link} title="Play">
                            <i className="fa fa-play-circle i-2x"></i>
                        </Link>
                    </div>
                </div>
                <div className="top">
                    <span className="badge bg-dark m-l-sm m-t-sm">{video.time}</span>
                </div>
                <Link to={link}>
                    <img src={video.image} alt={video.title} className="r r-2x img-full video-thumb" />
                </Link>
            </div>
            <div className="padder-v">
                <Link to={link} className="text-ellipsis">{video.title}</Link>
                <span className={large ? "text-ellipsis block" : "text-ellipsis text-xs text-muted block"}>
                    {video.cast} · {video.category} · {video.year}
                </span>
            </div>
        </div>
    );
}

export default function Video() {
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const featured = VideoData.filter((video) => video.featured);

    const query = search.trim().toLowerCase();
    const filtered = VideoData.filter((video) =>
        (category === 'All' || video.category === category) &&
        (video.title.toLowerCase().includes(query) || video.cast.toLowerCase().includes(query))
    );
    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pageVideos = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const goTo = (e, n) => {
        e.preventDefault();
        if (n >= 1 && n <= pageCount) {
            setPage(n);
        }
    };

    // Changing the filter or search starts again at page 1
    const changeCategory = (e, name) => {
        e.preventDefault();
        setCategory(name);
        setPage(1);
    };

    return (
        <>
            <section className="scrollable padder-lg noJsplayer">
                <h2 className="font-thin m-b">Video</h2>
                <div className="row row-sm">
                    {featured.map((video) => (
                        <div className="col-xs-12 col-sm-4" key={video.id}>
                            <VideoCard video={video} large />
                        </div>
                    ))}
                </div>

                <div className="clearfix m-t m-b">
                    <input type="text" className="form-control input-s-lg pull-right rounded" placeholder="Search videos..."
                        value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                    <h3 className="font-thin m-t-none m-b-sm">Video List</h3>
                    <ul className="nav nav-pills nav-sm">
                        {categories.map((name) => (
                            <li key={name} className={category === name ? 'active' : ''}>
                                <a href="#" onClick={(e) => changeCategory(e, name)}>{name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="row row-sm">
                    {pageVideos.length === 0 && (
                        <div className="col-xs-12 text-muted m-b">No videos found.</div>
                    )}
                    {pageVideos.map((video) => (
                        <div className="col-xs-6 col-sm-4 col-md-3" key={video.id}>
                            <VideoCard video={video} />
                        </div>
                    ))}
                </div>

                {pageCount > 1 && (
                    <ul className="pagination pagination">
                        <li className={currentPage === 1 ? 'disabled' : ''}>
                            <a href="#" onClick={(e) => goTo(e, currentPage - 1)}><i className="fa fa-chevron-left"></i></a>
                        </li>
                        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                            <li key={n} className={n === currentPage ? 'active' : ''}>
                                <a href="#" onClick={(e) => goTo(e, n)}>{n}</a>
                            </li>
                        ))}
                        <li className={currentPage === pageCount ? 'disabled' : ''}>
                            <a href="#" onClick={(e) => goTo(e, currentPage + 1)}><i className="fa fa-chevron-right"></i></a>
                        </li>
                    </ul>
                )}
            </section>
        </>
    )
}
