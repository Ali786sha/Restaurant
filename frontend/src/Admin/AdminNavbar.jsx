import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/admin">Admin Panel</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar" aria-controls="adminNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="adminNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin') ? 'active' : ''}`} to="/admin">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/menu') ? 'active' : ''}`} to="/admin/menu">Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/orders') ? 'active' : ''}`} to="/admin/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/reservations') ? 'active' : ''}`} to="/admin/reservations">Reservations</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
