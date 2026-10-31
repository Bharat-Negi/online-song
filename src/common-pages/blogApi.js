import { useCallback, useEffect, useState } from 'react';

const API = 'http://localhost:8000/post';
const COMMENTS = 'http://localhost:8000/comment';

export const categories = ['News', 'Tips', 'Artists', 'Events', 'Reviews'];

// Cover pictures the editor offers (the user can also upload one)
export const coverChoices = ['m40.jpg', 'm41.jpg', 'm42.jpg', 'm43.jpg', 'm44.jpg', 'm45.jpg', 'm31.jpg', 'm30.jpg', 'm22.jpg', 'm21.jpg']
    .map((f) => '../images/' + f);

// ~200 words a minute
export const readTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200)) + ' min read';

// First paragraph, cut at ~160 characters
export const excerpt = (text, length = 160) => {
    const first = text.trim().split(/\n\s*\n/)[0];
    return first.length > length ? first.slice(0, length).replace(/\s+\S*$/, '') + '…' : first;
};

export const formatPostDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const json = (res) => {
    if (!res.ok) {
        throw new Error('Server responded with ' + res.status);
    }
    return res.json();
};
const send = (url, method, body) => fetch(url, {
    method, headers: { 'content-type': 'application/json' }, body: body && JSON.stringify(body)
}).then(json);

export const createPost = (post) => send(API, 'POST', post);
export const updatePost = (id, change) => send(`${API}/${id}`, 'PATCH', change);
export const deletePost = (id) => fetch(`${API}/${id}`, { method: 'DELETE' }).then((res) => {
    if (!res.ok) {
        throw new Error('Server responded with ' + res.status);
    }
});

// All posts (newest first) and the number of comments on each
export function useBlogPosts() {
    const [state, setState] = useState({ posts: [], comments: {}, status: 'loading' });

    const load = useCallback(() => {
        Promise.all([
            fetch(`${API}?_sort=date&_order=desc`).then(json),
            fetch(`${COMMENTS}?page_like=^blog-`).then(json)
        ]).then(([posts, comments]) => {
            const counts = {};
            comments.forEach((c) => {
                counts[c.page] = (counts[c.page] || 0) + 1;
            });
            setState({ posts, comments: counts, status: 'ok' });
        }).catch(() => setState({ posts: [], comments: {}, status: 'error' }));
    }, []);

    useEffect(load, [load]);

    // Change one post in place (e.g. after a like)
    const replace = (post) => setState((s) => ({ ...s, posts: s.posts.map((p) => p.id === post.id ? post : p) }));

    return { ...state, reload: load, replace };
}

// Like / unlike as the current user; returns the updated post
export const toggleLike = (post, user) => {
    const likes = post.likes || [];
    const next = likes.includes(user) ? likes.filter((u) => u !== user) : [...likes, user];
    return updatePost(post.id, { likes: next });
};
