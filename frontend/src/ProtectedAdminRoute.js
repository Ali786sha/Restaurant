import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.role !== 'admin') {
            return <Navigate to="/admin/login" />;
        }
        return children;
    } catch (err) {
        return <Navigate to="/admin/login" />;
    }
};

export default ProtectedAdminRoute;
