import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Home from './components/Home';
import MyCart from './components/MyCart/MyCart';
// import AppRoutes from './Admin/routes';
import Dashboard from './Admin/Dashboard';
import AdminLogin from './Admin/AdminLogin';
import Menu from './Admin/Menu';
import Orders from './Admin/Orders';
import Reservation from './Admin/Reservation';
import ProtectedUserRoute from './ProtectedUserRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// ---- me---- 
import VerifyEmail from './components/Email/verify';
// ---me end ---
import Payment from './components/Payment/Payment';
function App() {
  return (
    <BrowserRouter>
    {/* <AppRoutes /> */}
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* ---me--- */}
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
{/* ------ me end ---- */}
<Route path="/payment" element={<ProtectedUserRoute><Payment /></ProtectedUserRoute>} />


      {/* Protected User Routes */}
      {/* <Route path="/" element={<ProtectedUserRoute> <Home /> </ProtectedUserRoute>} /> */}
      <Route path="/profile" element={<ProtectedUserRoute> <Profile /> </ProtectedUserRoute>} />
      <Route path="/cart" element={<ProtectedUserRoute> <MyCart /> </ProtectedUserRoute>} />



      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedAdminRoute> <Dashboard /> </ProtectedAdminRoute>} />
      <Route path="/admin/menu" element={<ProtectedAdminRoute> <Menu /> </ProtectedAdminRoute>} />
      <Route path="/admin/orders" element={<ProtectedAdminRoute> <Orders /> </ProtectedAdminRoute>} />
      <Route path="/admin/reservations" element={<ProtectedAdminRoute> <Reservation /> </ProtectedAdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
