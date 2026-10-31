import { useLibrary } from './libraryContext';

const avatarColors = ['#4cb6cb', '#7266ba', '#27c24c', '#f0b429', '#f05050', '#2b8fa8', '#c97b45'];

// "Chris Fox" -> "CF"
export const initials = (name) => name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

// Same colour for the same name every time
export const colorFor = (name) => avatarColors[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % avatarColors.length];

// Photo if there is one, otherwise coloured initials; scales to whatever box it is placed in
export function Avatar({ name, image, className = '' }) {
    if (image) {
        return <img src={image} alt={name} className={`img-circle user-avatar ${className}`} />;
    }
    return (
        <svg viewBox="0 0 100 100" className={`user-avatar ${className}`} role="img" aria-label={name}>
            <circle cx="50" cy="50" r="50" fill={colorFor(name || '?')} />
            <text x="50" y="50" dy="0.35em" textAnchor="middle" fill="#fff" fontSize="40" fontWeight="700" fontFamily="inherit">
                {initials(name || '?')}
            </text>
        </svg>
    );
}

// The logged-in user's avatar
export function UserAvatar({ className }) {
    const library = useLibrary();
    const name = sessionStorage.getItem('username') || '';
    return <Avatar name={name} image={library.avatar} className={className} />;
}
