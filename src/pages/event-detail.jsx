import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLibrary } from '../common-pages/libraryContext';
import { sortedEvents, isPast, formatDay, formatTime, formatPrice, whenLabel, downloadCalendarFile } from '../common-pages/eventUtils';
import EventData from '../json-data/events.json';

export default function EventDetailPage() {
    const { id } = useParams();
    const library = useLibrary();
    const scrollRef = useRef(null);
    const event = EventData.find((item) => String(item.id) === id);

    // Back to the top when switching to another event
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [id]);

    if (!event) {
        return <Navigate to="/events" replace />;
    }

    const past = isPast(event);
    const going = library.isGoing(event.id);
    const more = sortedEvents().filter((e) => e.id !== event.id && !isPast(e)).slice(0, 5);

    const toggleGoing = () => {
        const added = library.toggleGoing(event.id);
        toast.success(added ? `You're going to ${event.title}` : `Removed ${event.title} from your events`);
    };

    const addToCalendar = () => {
        downloadCalendarFile(event);
        toast.info('Calendar file downloaded. Open it to add the event.');
    };

    const share = () => {
        const text = `${event.title} – ${formatDay(event.date)}, ${event.venue}, ${event.city}: ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Event link copied to clipboard');
        }).catch(() => {
            toast.error('Could not copy the link');
        });
    };

    return (
        <section className="scrollable noJsplayer" ref={scrollRef}>
            <div className="item pos-rlt event-banner">
                <div className="top wrapper-lg">
                    <Link to="/events" className="btn btn-sm btn-rounded btn-default"><i className="fa fa-chevron-left m-r-xs"></i> All events</Link>
                </div>
                <div className="bottom gd bg-info wrapper-lg">
                    <span className={past ? "badge bg-dark m-b-sm" : "badge bg-danger m-b-sm"}>{whenLabel(event)}</span>
                    <div className="m-b-sm"><span className={`b-b b-${event.color} h2 text-u-c text-lt font-bold`}>{event.title}</span></div>
                    <p className="text-white m-b-none">
                        <i className="icon-calendar m-r-xs"></i>{formatDay(event.date)} · {formatTime(event.date)}
                        <i className="fa fa-map-marker m-l m-r-xs"></i>{event.venue}, {event.city}
                    </p>
                </div>
                {/* key: fade in again when switching events */}
                <img key={event.id} src={event.image} alt={event.title} className="img-full event-banner-img animated fadeIn" />
            </div>

            <div className="wrapper-lg">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="panel wrapper-lg">
                            <div className="m-b">
                                {past ? (
                                    <span className="btn btn-default btn-rounded disabled m-r-xs"><i className="icon-clock m-r-xs"></i>This event has ended</span>
                                ) : (
                                    <>
                                        <button className={going ? "btn btn-success btn-rounded m-r-xs" : "btn btn-info btn-rounded m-r-xs"} onClick={toggleGoing}>
                                            <i className={going ? "fa fa-check m-r-xs" : "icon-star m-r-xs"}></i>{going ? "Going" : "I'm going"}
                                        </button>
                                        <button className="btn btn-default btn-rounded m-r-xs" onClick={addToCalendar}>
                                            <i className="icon-calendar m-r-xs"></i>Add to calendar
                                        </button>
                                    </>
                                )}
                                <button className="btn btn-default btn-rounded" onClick={share}>
                                    <i className="icon-share m-r-xs"></i>Share
                                </button>
                            </div>
                            <h4 className="font-thin">About this event</h4>
                            <p>{event.description}</p>
                            <div className="line b-b"></div>
                            <div className="row text-center event-facts">
                                <div className="col-xs-6 col-sm-3"><small className="text-muted block">Date</small>{formatDay(event.date)}</div>
                                <div className="col-xs-6 col-sm-3"><small className="text-muted block">Starts</small>{formatTime(event.date)} · {event.duration} h</div>
                                <div className="col-xs-6 col-sm-3"><small className="text-muted block">Category</small>{event.category}</div>
                                <div className="col-xs-6 col-sm-3"><small className="text-muted block">Tickets</small>{formatPrice(event.price)}</div>
                            </div>
                        </div>
                        <div className="panel wrapper">
                            <i className="fa fa-map-marker text-info m-r-xs"></i>
                            <strong>{event.venue}</strong>, {event.city}
                            <a className="pull-right" target="_blank" rel="noreferrer"
                                href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(event.venue + ', ' + event.city)}>
                                Open in Maps <i className="fa fa-external-link"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">More upcoming events</div>
                            <div className="panel-body">
                                {more.length === 0 && <span className="text-muted">No other upcoming events.</span>}
                                {more.map((item) => (
                                    <article className="media" key={item.id}>
                                        <Link to={'/events/' + item.id} className="pull-left thumb-lg m-t-xs">
                                            <img src={item.image} alt={item.title} className="square-thumb" />
                                        </Link>
                                        <div className="media-body">
                                            <Link to={'/events/' + item.id} className="font-semibold">{item.title}</Link>
                                            <div className="text-xs block m-t-xs">{formatDay(item.date)}</div>
                                            <div className="text-xs text-muted">{item.city}{library.isGoing(item.id) && <span className="text-success"> · Going</span>}</div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
