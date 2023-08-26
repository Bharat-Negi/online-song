import { useEffect, useState } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPage from '../common-pages/header';
import LeftBar from '../common-pages/leftBar';
import WhatsNew from '../pages/what-new'

export default function HomePage() {

    const usenavigate = useNavigate();
    const [customerlist, listupdate] = useState(null);

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }
    }, []);

    return (
        <section className="vbox">
            <HeaderPage />
            <section className="hbox stretch">
                <LeftBar />
                <WhatsNew />
            </section>
        </section>
    )
}