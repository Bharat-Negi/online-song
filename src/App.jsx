import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home'
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <>
    <ToastContainer></ToastContainer>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}