import { useEffect, useState } from "react";

const API = "http://localhost:8000/notification";

// "10 minutes ago" style label for a notification time
export function timeAgo(time) {
    const seconds = Math.floor((Date.now() - new Date(time).getTime()) / 1000);
    const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
    for (const [unit, size] of units) {
        const value = Math.floor(seconds / size);
        if (value >= 1) {
            return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
}

export default function useNotifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch(API + "?_sort=time&_order=desc").then((res) => {
            return res.ok ? res.json() : [];
        }).then((resp) => {
            setNotifications(resp);
        }).catch(() => {
            setNotifications([]);
        });
    }, []);

    const markRead = (id) => {
        setNotifications((list) => list.map((n) => n.id === id ? { ...n, read: true } : n));
        fetch(API + "/" + id, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ read: true })
        }).catch(() => {});
    };

    const markAllRead = () => {
        notifications.filter((n) => !n.read).forEach((n) => markRead(n.id));
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return { notifications, unreadCount, markRead, markAllRead };
}
