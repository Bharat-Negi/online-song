import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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

import AcousticPage from './genres-pages/acoustic';
import AmbientPage from './genres-pages/ambient';
import BluesPage from './genres-pages/blues';
import ClassicalPage from './genres-pages/classical';

export default function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/genres" element={<Layout><GenresPage /></Layout>}>
            <Route path="acoustic" element={<AcousticPage />} />
            <Route path="ambient" element={<AmbientPage />} />
            <Route path="blues" element={<BluesPage />} />
            <Route path="classical" element={<ClassicalPage />} />
          </Route>
          <Route path="/listen" element={<Layout><ListenPage /></Layout>} />
          <Route path="/events" element={<Layout><EventsPage /></Layout>} />
          <Route path="/video" element={<Layout><VideoPage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/invoice" element={<Layout><InvoicePage /></Layout>} />
          <Route path="/video-detail" element={<Layout><VideoDetailPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
