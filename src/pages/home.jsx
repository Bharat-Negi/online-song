import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsNew from '../pages/what-new';

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
        <WhatsNew />
    )
}