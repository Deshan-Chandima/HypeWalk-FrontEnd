import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import AdminPage from './pages/adminPage.jsx';
import { Toaster } from 'react-hot-toast';

import ProductOverview from './pages/client/productOverView.jsx';
import MenPage from './pages/client/menPage.jsx';
import WomenPage from './pages/client/womenPage.jsx';
import CartPage from './pages/client/cart.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage/>} />
        <Route path="/Overview/:productId" element={<ProductOverview />} />
        <Route path="/cart" element={<CartPage/>} />
        

      </Routes>
    </BrowserRouter>
  );
}
