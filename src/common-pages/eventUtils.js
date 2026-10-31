import EventData from '../json-data/events.json';

// Event ends "duration" hours after it starts
const endOf = (event) => new Date(new Date(event.date).getTime() + event.duration * 3600 * 1000);

export const isPast = (event) => endOf(event) < new Date();

// Upcoming first (soonest first), then past events (most recent first)
export const sortedEvents = () => {
    const upcoming = EventData.filter((e) => !isPast(e)).sort((a, b) => new Date(a.date) - new Date(b.date));
    const past = EventData.filter(isPast).sort((a, b) => new Date(b.date) - new Date(a.date));
    return [...upcoming, ...past];
};

export const upcomingCount = () => EventData.filter((e) => !isPast(e)).length;

// "Sat, 14 Nov 2026"
export const formatDay = (date) => {
    const d = new Date(date);
    const part = (options) => d.toLocaleDateString('en-IN', options);
    return `${part({ weekday: 'short' })}, ${d.getDate()} ${part({ month: 'short' })} ${d.getFullYear()}`;
};

// "7:00 pm"
export const formatTime = (date) => new Date(date).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });

// { month: "NOV", day: "14" } for the date badge
export const dateBadge = (date) => {
    const d = new Date(date);
    return { month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(), day: d.getDate() };
};

// "Today", "Tomorrow", "In 14 days", "Happening now" or "Ended"
export const whenLabel = (event) => {
    const now = new Date();
    const start = new Date(event.date);
    if (isPast(event)) {
        return 'Ended';
    }
    if (start <= now) {
        return 'Happening now';
    }
    const days = Math.round((new Date(start.toDateString()) - new Date(now.toDateString())) / 86400000);
    if (days === 0) {
        return 'Today';
    }
    if (days === 1) {
        return 'Tomorrow';
    }
    return `In ${days} days`;
};

export const formatPrice = (price) => price === 0 ? 'Free' : '₹' + price.toLocaleString('en-IN');

// Calendar file (.ics) that opens in Google Calendar, Outlook or Apple Calendar
export const downloadCalendarFile = (event) => {
    const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const escape = (text) => text.replace(/([,;\\])/g, '\\$1');
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Online Song//Events//EN',
        'BEGIN:VEVENT',
        `UID:event-${event.id}@online-song`,
        `DTSTAMP:${stamp(new Date())}`,
        `DTSTART:${stamp(new Date(event.date))}`,
        `DTEND:${stamp(endOf(event))}`,
        `SUMMARY:${escape(event.title)}`,
        `LOCATION:${escape(event.venue + ', ' + event.city)}`,
        `DESCRIPTION:${escape(event.description)}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.ics';
    link.click();
    URL.revokeObjectURL(link.href);
};
