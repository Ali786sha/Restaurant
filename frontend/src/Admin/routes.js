import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import Menu from './Menu';
import Orders from './Orders';
import Reservation from './Reservation';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/admin/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
			<Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
			<Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/reservations" element={<Reservation />} />

            {/* Other routes will be added here */}
        </Routes>
    );
};

export default AppRoutes;
