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

export default function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Layout><HomePage /></Layout>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/genres" element={<Layout><GenresPage /></Layout>}></Route>
          <Route path="/listen" element={<Layout><ListenPage /></Layout>}></Route>
          <Route path="/events" element={<Layout><EventsPage /></Layout>}></Route>
          <Route path="/video" element={<Layout><VideoPage /></Layout>}></Route>
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>}></Route>
          <Route path="/blog" element={<Layout><BlogPage /></Layout>}></Route>
          <Route path="/invoice" element={<Layout><InvoicePage /></Layout>}></Route>
          <Route path="/video-detail" element={<Layout><VideoDetailPage /></Layout>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
