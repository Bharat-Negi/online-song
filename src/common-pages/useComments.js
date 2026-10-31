import { useEffect, useState } from "react";

const API = "http://localhost:8000/comment";

// Loads and adds comments for one page ("blog", "video-1", ...)
export default function useComments(page) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(API + "?page=" + encodeURIComponent(page) + "&_sort=time&_order=asc").then((res) => {
            return res.ok ? res.json() : [];
        }).then((resp) => {
            setComments(resp);
        }).catch(() => {
            setComments([]);
        });
    }, [page]);

    const addComment = (comment) => {
        return fetch(API, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...comment, page, time: new Date().toISOString() })
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Server responded with ' + res.status);
            }
            return res.json();
        }).then((saved) => {
            setComments((list) => [...list, saved]);
            return saved;
        });
    };

    return { comments, addComment };
}
