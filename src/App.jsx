import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import AdminPage from './pages/adminPage.jsx';
import { Toaster } from 'react-hot-toast';
import MenPage from './pages/menPage.jsx';
import WomenPage from './pages/womenPage.jsx';
import ProductOverview from './pages/client/productOverView.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/Overview" element={<ProductOverview />} />
        

      </Routes>
    </BrowserRouter>
  );
}
