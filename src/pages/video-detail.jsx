import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import CommentSection from '../common-pages/commentSection';
import useComments from '../common-pages/useComments';
import { usePlayer } from '../common-pages/playerContext';
import VideoData from '../json-data/videos.json';

export default function VideoDetailPage() {
    const { id } = useParams();
    const video = VideoData.find((item) => String(item.id) === id);
    const comments = useComments('video-' + id);
    const player = usePlayer();
    const scrollRef = useRef(null);
    const commentsRef = useRef(null);

    // Back to the top when switching to another video
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [id]);

    if (!video) {
        return <Navigate to="/video" replace />;
    }

    const index = VideoData.indexOf(video);
    const prev = VideoData[index - 1];
    const next = VideoData[index + 1];
    const suggestions = VideoData.filter((item) => item.id !== video.id);

    const scrollToComments = (e) => {
        e.preventDefault();
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <>
            <section className="scrollable wrapper-lg noJsplayer" ref={scrollRef}>
              <div className="row">
                <div className="col-sm-8">
                  <div className="panel">
                    {/* key: load the new source when the video changes; pause the music when the video starts */}
                    <video key={video.id} className="video-player" controls preload="metadata" poster={video.image} onPlay={player.pause}>
                      <source src={video.src} />
                      Your browser does not support the video tag.
                    </video>
                    <div className="wrapper-lg">
                      <h2 className="m-t-none text-black">{video.title}</h2>
                      <div className="post-sum">
                        <p>{video.description}</p>
                      </div>
                      <div className="line b-b"></div>
                      <div className="text-muted">
                        <i className="fa fa-user icon-muted"></i> by <span className="m-r-sm text-info">{video.cast}</span>
                        <i className="fa fa-film icon-muted"></i> {video.category}
                        <i className="fa fa-calendar icon-muted m-l-sm"></i> {video.year}
                        <i className="fa fa-clock-o icon-muted m-l-sm"></i> {video.time}
                        <a href="#" className="m-l-sm" onClick={scrollToComments}><i className="fa fa-comment-o icon-muted"></i> {comments.comments.length} comments</a>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix m-b">
                    {prev && <Link to={'/video/' + prev.id} className="btn btn-default btn-rounded"><i className="fa fa-chevron-left m-r-xs"></i> {prev.title}</Link>}
                    {next && <Link to={'/video/' + next.id} className="btn btn-default btn-rounded pull-right">{next.title} <i className="fa fa-chevron-right m-l-xs"></i></Link>}
                  </div>
                  <div ref={commentsRef}>
                    <CommentSection {...comments} />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="panel panel-default">
                    <div className="panel-heading">Suggestions</div>
                    <div className="panel-body">
                      {suggestions.map((item) => (
                        <article className="media" key={item.id}>
                          <Link to={'/video/' + item.id} className="pull-left thumb-lg m-t-xs">
                            <img src={item.image} alt={item.title} className="video-thumb" />
                          </Link>
                          <div className="media-body">
                            <Link to={'/video/' + item.id} className="font-semibold">{item.title}</Link>
                            <div className="text-xs block m-t-xs">{item.category} · {item.time}</div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </>
    )
}
