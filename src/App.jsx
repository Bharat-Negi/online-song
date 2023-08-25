import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home'
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { ToastContainer } from 'react-toastify';
import GenresPage from '../src/pages/genres';
import ListenPage from '../src/pages/listen';
import EventsPage from '../src/pages/events';
import VideoPage from '../src/pages/video';

export default function App() {
  return (
    <>
    <ToastContainer></ToastContainer>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/genres" element={<GenresPage />}></Route>
        <Route path="/listen" element={<ListenPage />}></Route>
        <Route path="/events" element={<EventsPage />}></Route>
        <Route path="/video" element={<VideoPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}