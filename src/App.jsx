import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import GenresPage from './pages/genres';
import ListenPage from './pages/listen';
import EventsPage from './pages/events';
import VideoPage from './pages/video';
import ProfilePage from './pages/profile';
import HeaderPage from './common-pages/header';
import LeftBar from './common-pages/leftBar';

export default function App() {
  const [isLogo, setIsLogo] = useState(false);  

  const leftLogoOpen = () => {
    setIsLogo(!isLogo);
  };  

  return (
    <>
      <ToastContainer></ToastContainer>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Routes>
        <section className="vbox">
          <HeaderPage leftLogoOpen={leftLogoOpen} isLogo={isLogo} />
          <section className="hbox stretch">
            <LeftBar isLogo={isLogo} />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              {/* <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/signup" element={<SignupPage />}></Route> */}
              <Route path="/genres" element={<GenresPage />}></Route>
              <Route path="/listen" element={<ListenPage />}></Route>
              <Route path="/events" element={<EventsPage />}></Route>
              <Route path="/video" element={<VideoPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
            </Routes>
          </section>
        </section>
      </BrowserRouter>

    </>
  )
}