# 👟 Shoe Store - E-Commerce Frontend

A modern, full-featured e-commerce web application for selling shoes built with React and Vite. Features a beautiful UI with a clean design, complete shopping cart functionality, user authentication, and an admin panel for order management.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Color Theme](#color-theme)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Customer Features
- 🔍 **Product Browsing** - Browse shoes by categories (Men's, Women's, Urban Streetwear)
- 👁️ **Product Details** - View detailed product information with image gallery
- 🛒 **Shopping Cart** - Add items to cart with size selection
- 💳 **Checkout System** - Complete order placement with delivery details
- 🔐 **User Authentication** - Secure login and registration system
- 📱 **Responsive Design** - Fully responsive across all devices

### Admin Features
- 📊 **Admin Dashboard** - Overview of store statistics
- 📦 **Order Management** - View, update, and track all orders
- 🔄 **Order Status Updates** - Change order status (pending, processing, shipped, delivered)
- 🔍 **Search & Filter** - Search orders by ID, email, or phone
- 📈 **Analytics** - View order statistics by status

### Security Features
- 🔒 **Protected Routes** - Role-based access control
- 🎫 **JWT Authentication** - Secure token-based authentication
- ⏰ **Session Management** - Automatic token expiration handling
- 🛡️ **Admin-Only Pages** - Restricted access to admin panel

## 🛠️ Tech Stack

**Framework & Libraries:**
- ⚛️ React 18.x
- ⚡ Vite 5.x
- 🧭 React Router DOM
- 🎨 Tailwind CSS
- 📡 Axios
- 🔔 React Hot Toast
- 🎯 Lucide React (Icons)
- 🔐 JWT Decode

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)

## 🚀 Installation

1. **Clone the repository**
git clone https://github.com/Deshan-Chandima/shoe-store-frontend.git
cd shoe-store-fron

text

2. **Install dependencies**
npm install

or
yarn install

text

3. **Install additional packages** (if not already in package.json)
npm install react-router-dom axios react-hot-toast lucide-react jwt-decode

text



## ▶️ Running the Application

### Development Mode
npm run dev

or
yarn dev

text

The application will start on `http://localhost:5173`

### Build for Production
npm run build

or
yarn build

text

### Preview Production Build
npm run preview

or
yarn preview

text

## 📁 Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ └── ProtectedRoute.jsx
├── pages/
│ ├── client/
│ │ ├── HomePage.jsx
│ │ ├── ProductOverview.jsx
│ │ ├── CartPage.jsx
│ │ ├── CheckoutPage.jsx
│ │ ├── LoginPage.jsx
│ │ └── RegisterPage.jsx
│ └── admin/
│ ├── AdminPage.jsx
│ └── AdminOrdersPage.jsx
├── utils/
│ └── cartService.js
├── hooks/
│ └── useAuth.js
├── App.jsx
├── main.jsx
text

## 🗺️ Available Routes

### Public Routes
- `/` - Home page with product listings
- `/product/:productId` - Product detail page
- `/login` - User login page
- `/register` - User registration page

### Protected Routes (Login Required)
- `/cart` - Shopping cart page
- `/checkout` - Checkout and order placement

### Admin Routes (Admin Only)
- `/admin` - Admin dashboard
- `/admin/orders` - Order management page

## 🎨 Color Theme

The application uses a consistent color palette:

- **Primary:** `#00B894` (Mint Green)
- **Background:** `#ECE9E2` (Off-white)
- **Text:** `#2D3436` (Dark Gray)
- **Secondary Text:** `#636E72` (Medium Gray)

## 📸 Screenshots

### Customer Views
- **Home Page** - Product grid with categories
- **Product Detail** - Image gallery, size selection, add to cart
- **Shopping Cart** - Cart items with quantity controls
- **Checkout** - Delivery form and order summary

### Admin Views
- **Dashboard** - Order statistics and overview
- **Order Management** - List of all orders with filters
- **Order Details** - View and update individual orders

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Integration

This frontend requires a backend API running. The backend should provide:

- **User Authentication:** `/api/users/login`, `/api/users` (register)
- **Product Management:** `/api/products`
- **Order Management:** `/api/orders`
- **Cart Management:** `/api/cart`

Ensure your backend is running before starting the frontend.

## 🐛 Known Issues

- None at the moment

## 🔮 Future Enhancements

- [ ] Add product reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add payment gateway integration
- [ ] Email notifications for orders
- [ ] Order tracking system
- [ ] Advanced search and filters
- [ ] Dark mode support



## 👨‍💻 Author
Deshan Chandima
