import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PlayerProvider } from "./common-pages/playerContext";
import { LibraryProvider } from "./common-pages/libraryContext";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import GenresPage from "./pages/genres";
import ListenPage from "./pages/listen";
import EventsPage from "./pages/events";
import VideoPage from "./pages/video";
import ProfilePage from "./pages/profile";
import Layout from './pages/layout';
import BlogPage from './pages/blog';
import InvoicePage from './pages/invoice';
import VideoDetailPage from './pages/video-detail';
import MyPlaylistPage from './pages/my-playlist';
import EventDetailPage from './pages/event-detail';
import SettingsPage from './pages/settings';

import GenrePage from './genres-pages/genre';

export default function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <PlayerProvider>
      <BrowserRouter>
      <LibraryProvider>
        <Routes>
          <Route path="/" exact element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/genres" element={<Layout><GenresPage /></Layout>}>
            <Route index element={<Navigate to="acoustic" replace />} />
            <Route path=":genre" element={<GenrePage />} />
          </Route>
          <Route path="/listen" element={<Layout><ListenPage /></Layout>} />
          <Route path="/events" element={<Layout><EventsPage /></Layout>} />
          <Route path="/video" element={<Layout><VideoPage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/invoice" element={<Layout><InvoicePage /></Layout>} />
          <Route path="/video/:id" element={<Layout><VideoDetailPage /></Layout>} />
          <Route path="/events/:id" element={<Layout><EventDetailPage /></Layout>} />
          {/* old link (used by notifications and bookmarks) */}
          <Route path="/video-detail" element={<Navigate to="/video/1" replace />} />
          <Route path="/my-playlist" element={<Layout><MyPlaylistPage /></Layout>} />
          <Route path="/playlist/:id" element={<Layout><MyPlaylistPage /></Layout>} />
        </Routes>
      </LibraryProvider>
      </BrowserRouter>
      </PlayerProvider>
    </>
  );
}
