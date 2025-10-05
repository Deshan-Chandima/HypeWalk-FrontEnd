import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import AdminPage from './pages/adminPage.jsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}