import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedUserRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.role !== 'user') {
            return <Navigate to="/login" />;
        }
        return children;
    } catch (err) {
        return <Navigate to="/login" />;
    }
};

export default ProtectedUserRoute;
