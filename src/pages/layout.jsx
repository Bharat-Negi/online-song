import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../common-pages/header";
import LeftBar from "../common-pages/leftBar";

function Layout({ children, username }) {
  const [isLogo, setIsLogo] = useState(false);
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

  let personName = sessionStorage.getItem('username');

  return (
    <>
      <section className="vbox">
        <HeaderPage leftLogoOpen={leftLogoOpen} isLogo={isLogo} personName={personName} />
        <section className="hbox stretch">
          <LeftBar isLogo={isLogo} personName={personName} />
          <section>
            <section className="vbox">
              {children}
            </section>
          </section>          
        </section>
      </section>
    </>
  );
}

export default Layout;
