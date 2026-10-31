import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLibrary } from "../common-pages/libraryContext";
import { sortedEvents, isPast, dateBadge, formatDay, formatTime, formatPrice, whenLabel } from "../common-pages/eventUtils";

const whenFilters = ['Upcoming', 'Past', 'All'];

// { days, hours, minutes } until a date, updated every 30 seconds
function useCountdown(date) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const left = Math.max(0, new Date(date).getTime() - now);
  return {
    days: Math.floor(left / 86400000),
    hours: Math.floor(left / 3600000) % 24,
    minutes: Math.floor(left / 60000) % 60
  };
}

// "November 2026"
const monthLabel = (date) => new Date(date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

// Banner when nothing upcoming matches the chosen city and category
function EmptyHero({ chip, title, pastCount, image, onShowPast }) {
  return (
    <div className="ev-hero">
      {image && <div className="ev-hero-bg" style={{ backgroundImage: `url(${image})`, filter: 'grayscale(0.7)' }}></div>}
      <div className="ev-hero-content">
        <span className="ev-chip ev-chip-light">{chip}</span>
        <h1 className="ev-hero-title">{title}</h1>
        <p className="ev-hero-meta">
          {pastCount > 0
            ? `${pastCount} past event${pastCount === 1 ? '' : 's'} matched this. New dates are added regularly.`
            : 'Nothing has been scheduled yet. New dates are added regularly.'}
        </p>
        <div className="ev-hero-actions m-t">
          {pastCount > 0 && <button className="btn btn-info btn-rounded" onClick={onShowPast}>Show past events</button>}
        </div>
      </div>
    </div>
  );
}

// Big rotating banner; "label" is the chip text, e.g. "★ Featured" or "📍 Mumbai · 3 upcoming"
function FeaturedHero({ events, library, onGoing, label = '★ Featured' }) {
  const [index, setIndex] = useState(0);
  const event = events[index % events.length];
  const countdown = useCountdown(event.date);
  const going = library.isGoing(event.id);

  useEffect(() => {
    if (events.length < 2) {
      return;
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % events.length), 6000);
    return () => clearInterval(timer);
  }, [events.length, index]);

  return (
    <div className="ev-hero">
      {/* key: fade the picture in on every slide */}
      <div key={event.id} className="ev-hero-bg animated fadeIn" style={{ backgroundImage: `url(${event.image})` }}></div>
      <div className="ev-hero-content">
        <span className="ev-chip ev-chip-light">{label} · {event.category}</span>
        <h1 className="ev-hero-title">{event.title}</h1>
        <p className="ev-hero-meta">
          <i className="icon-calendar"></i> {formatDay(event.date)} · {formatTime(event.date)}
          <span className="m-l"><i className="fa fa-map-marker"></i> {event.venue}, {event.city}</span>
        </p>
        <div className="ev-countdown">
          <div><strong>{countdown.days}</strong><span>days</span></div>
          <div><strong>{countdown.hours}</strong><span>hours</span></div>
          <div><strong>{countdown.minutes}</strong><span>min</span></div>
        </div>
        <div className="ev-hero-actions">
          <Link to={'/events/' + event.id} className="btn btn-info btn-rounded">View event</Link>
          <button className={going ? "btn btn-success btn-rounded" : "btn ev-btn-ghost btn-rounded"} onClick={() => onGoing(event)}>
            <i className={going ? "fa fa-check m-r-xs" : "icon-star m-r-xs"}></i>{going ? 'Going' : "I'm going"}
          </button>
          <span className="ev-hero-price">{formatPrice(event.price)}</span>
        </div>
      </div>
      {events.length > 1 && (
        <div className="ev-hero-nav">
          <button onClick={() => setIndex((index - 1 + events.length) % events.length)} title="Previous"><i className="fa fa-chevron-left"></i></button>
          {events.map((e, i) => (
            <span key={e.id} className={i === index % events.length ? 'active' : ''} title={e.title} onClick={() => setIndex(i)}></span>
          ))}
          <button onClick={() => setIndex((index + 1) % events.length)} title="Next"><i className="fa fa-chevron-right"></i></button>
        </div>
      )}
    </div>
  );
}

function EventCard({ event, going, onGoing }) {
  const badge = dateBadge(event.date);
  const past = isPast(event);
  return (
    <div className={past ? "ev-card ev-card-past" : "ev-card"}>
      <Link to={'/events/' + event.id} className="ev-card-media">
        <img src={event.image} alt={event.title} />
        <span className="ev-date">
          <span className="ev-date-month">{badge.month}</span>
          <span className="ev-date-day">{badge.day}</span>
        </span>
        <span className={past ? "ev-when ev-when-past" : "ev-when"}>{whenLabel(event)}</span>
      </Link>
      <div className="ev-card-body">
        <span className="ev-chip">{event.category}</span>
        <Link to={'/events/' + event.id} className="ev-card-title text-ellipsis">{event.title}</Link>
        <div className="ev-card-line text-ellipsis"><i className="icon-clock"></i> {formatDay(event.date)} · {formatTime(event.date)}</div>
        <div className="ev-card-line text-ellipsis"><i className="fa fa-map-marker"></i> {event.venue}, {event.city}</div>
      </div>
      <div className="ev-card-foot">
        <span className="ev-price">{formatPrice(event.price)}</span>
        {past ? (
          <span className="text-muted text-xs">Ended</span>
        ) : (
          <button className={going ? "btn btn-xs btn-success btn-rounded" : "btn btn-xs btn-default btn-rounded"} onClick={() => onGoing(event)}>
            <i className={going ? "fa fa-check m-r-xs" : "icon-star m-r-xs"}></i>{going ? 'Going' : "I'm going"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const library = useLibrary();
  const [when, setWhen] = useState('Upcoming');
  const [category, setCategory] = useState('All');
  const [city, setCity] = useState('All cities');
  const [search, setSearch] = useState('');

  const all = sortedEvents();
  const categories = ['All', ...new Set(all.map((e) => e.category))];
  const cities = ['All cities', ...[...new Set(all.map((e) => e.city))].sort()];
  const myEvents = all.filter((e) => library.isGoing(e.id) && !isPast(e));

  const query = search.trim().toLowerCase();
  const events = all.filter((e) =>
    (when === 'All' || (when === 'Past') === isPast(e)) &&
    (category === 'All' || e.category === category) &&
    (city === 'All cities' || e.city === city) &&
    (e.title.toLowerCase().includes(query) || e.city.toLowerCase().includes(query) || e.venue.toLowerCase().includes(query))
  );
  const isFiltered = when !== 'Upcoming' || category !== 'All' || city !== 'All cities' || query !== '';

  // Banner: upcoming events for the chosen city and category, soonest first.
  // Without a city it prefers the featured ones.
  const isCity = city !== 'All cities';
  const matches = (e) => (!isCity || e.city === city) && (category === 'All' || e.category === category);
  const heroUpcoming = all.filter((e) => matches(e) && !isPast(e));
  const heroFeatured = heroUpcoming.filter((e) => e.featured);
  const showFeaturedOnly = !isCity && category === 'All' && heroFeatured.length > 0;
  // With a category picked: all its upcoming events, featured ones first
  const heroEvents = showFeaturedOnly ? heroFeatured : [...heroFeatured, ...heroUpcoming.filter((e) => !e.featured)];
  const heroPast = all.filter((e) => matches(e) && isPast(e));
  const kind = category === 'All' ? 'events' : category.toLowerCase() + (category.endsWith('s') ? 'es' : 's');
  const heroLabel = isCity
    ? `📍 ${city} · ${heroUpcoming.length} upcoming`
    : showFeaturedOnly ? '★ Featured' : `★ ${heroUpcoming.length} upcoming ${heroUpcoming.length === 1 ? category.toLowerCase() : kind}`;

  const showPast = () => {
    setWhen('Past');
  };

  // Group by month, keeping the sorted order
  const groups = [];
  events.forEach((e) => {
    const label = monthLabel(e.date);
    const group = groups.find((g) => g.label === label);
    group ? group.events.push(e) : groups.push({ label, events: [e] });
  });

  const toggleGoing = (event) => {
    const added = library.toggleGoing(event.id);
    toast.success(added ? `You're going to ${event.title}` : `Removed ${event.title} from your events`);
  };

  const clearFilters = () => {
    setWhen('Upcoming');
    setCategory('All');
    setCity('All cities');
    setSearch('');
  };

  return (
    <section className="scrollable noJsplayer ev-page">
      {/* Stays on every tab; key restarts the slides when the city or category changes */}
      {query === '' && (heroEvents.length > 0
        ? <FeaturedHero key={city + category} events={heroEvents} library={library} onGoing={toggleGoing} label={heroLabel} />
        : <EmptyHero key={city + category} chip={isCity ? `📍 ${city}` : `★ ${category}`}
            title={`No upcoming ${kind}${isCity ? ' in ' + city : ''}`}
            pastCount={heroPast.length} image={heroPast[0] && heroPast[0].image} onShowPast={showPast} />)}

      <div className="padder-lg">
        {myEvents.length > 0 && !isFiltered && (
          <div className="ev-mine">
            <h4 className="ev-section-title">Your upcoming events <small>{myEvents.length}</small></h4>
            <div className="ev-mine-list">
              {myEvents.map((e) => (
                <Link to={'/events/' + e.id} className="ev-mine-item" key={e.id}>
                  <img src={e.image} alt={e.title} />
                  <span className="ev-mine-text">
                    <strong className="text-ellipsis">{e.title}</strong>
                    <small>{formatDay(e.date)} · {e.city}</small>
                    <small className="text-success">{whenLabel(e)}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="ev-toolbar">
          <div className="ev-segment">
            {whenFilters.map((name) => (
              <button key={name} className={when === name ? 'active' : ''} onClick={() => setWhen(name)}>{name}</button>
            ))}
          </div>
          <div className="ev-search">
            <i className="fa fa-search"></i>
            <input type="text" className="form-control" placeholder="Search events, venues..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-control ev-city" value={city} onChange={e => setCity(e.target.value)}>
            {cities.map((name) => <option key={name}>{name}</option>)}
          </select>
        </div>
        <div className="ev-chips">
          {categories.map((name) => (
            <button key={name} className={category === name ? 'ev-chip-btn active' : 'ev-chip-btn'} onClick={() => setCategory(name)}>{name}</button>
          ))}
          <span className="ev-count">{events.length} event{events.length === 1 ? '' : 's'}</span>
        </div>

        {events.length === 0 ? (
          <div className="ev-empty">
            <i className="icon-calendar"></i>
            <h4>No events found</h4>
            <p className="text-muted">Try another search, city or category.</p>
            <button className="btn btn-info btn-rounded" onClick={clearFilters}>Clear filters</button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="ev-group">
              <h4 className="ev-section-title">{group.label}</h4>
              <div className="ev-grid">
                {group.events.map((event) => (
                  <EventCard key={event.id} event={event} going={library.isGoing(event.id)} onGoing={toggleGoing} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
