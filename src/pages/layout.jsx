import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../common-pages/header";
import LeftBar from "../common-pages/leftBar";

function Layout({ children }) {
    const [isLogo, setIsLogo] = useState(false);
    const [customerlist, listupdate] = useState(null);
    const usenavigate = useNavigate();

    const leftLogoOpen = () => {
      setIsLogo(!isLogo);
    };

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }
    }, []);
  
  return (
    <>
      <section className="vbox">
        <HeaderPage leftLogoOpen={leftLogoOpen} isLogo={isLogo} />
        <section className="hbox stretch">
          <LeftBar isLogo={isLogo} />
          {children}
        </section>
      </section>
    </>
  );
}

export default Layout;
