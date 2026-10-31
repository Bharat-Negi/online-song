import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import HeaderPage from "../common-pages/header";
import LeftBar from "../common-pages/leftBar";
import useNotifications from "../common-pages/useNotifications";
import { readUiSettings } from "../common-pages/uiSettings";

function Layout({ children }) {
  // Collapsed sidebar if chosen in Settings > Appearance
  const [isLogo, setIsLogo] = useState(() => readUiSettings().collapsedSidebar);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNoti, setIsNoti] = useState(false);
  const notifications = useNotifications();
  const location = useLocation();

  const leftLogoOpen = () => {
    setIsLogo(!isLogo);
  };

  const mobileNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close the mobile menu after navigating to another page
  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  let personName = sessionStorage.getItem('username');

  // Redirect before rendering so protected pages never show without a login
  if (personName === '' || personName === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <section className="vbox">
        <HeaderPage leftLogoOpen={leftLogoOpen} isLogo={isLogo} personName={personName} mobileNavToggle={mobileNavToggle}
          notifications={notifications} isNoti={isNoti} setIsNoti={setIsNoti} />
        <section className="hbox stretch">
          <LeftBar isLogo={isLogo} personName={personName} isNavOpen={isNavOpen}
            unreadCount={notifications.unreadCount} openNotifications={() => setIsNoti(true)} />
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
