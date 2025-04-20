import React, { useEffect, useState } from 'react';
import Navbar from './AdminNavbar';
import axios from 'axios';

const Dashboard = () => {
    const [menuCount, setMenuCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [reservationCount, setReservationCount] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentReservations, setRecentReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            try {
                const [menuRes, ordersRes, reservationsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/menu', config),
                    axios.get('http://localhost:5000/api/orders', config),
                    axios.get('http://localhost:5000/api/reservations', config),
                ]);

                setMenuCount(menuRes.data.length);
                setOrderCount(ordersRes.data.length);
                setReservationCount(reservationsRes.data.length);

                const sortedOrders = ordersRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentOrders(sortedOrders.slice(0, 3));

                const sortedReservations = reservationsRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentReservations(sortedReservations.slice(0, 3));
            } catch (err) {
                console.error("Dashboard data loading failed:", err);
            }
        };

        fetchData();
    }, []); // ✅ No warning now

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2>Welcome, Admin 👋</h2>

                {/* Cards Section */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Total Menu Items</h5>
                                <p className="card-text fs-4">{menuCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Total Orders</h5>
                                <p className="card-text fs-4">{orderCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-dark bg-warning mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Total Reservations</h5>
                                <p className="card-text fs-4">{reservationCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="row mt-5">
                    <div className="col-md-6">
                        <h5>Recent Orders</h5>
                        <ul className="list-group">
                            {recentOrders.map(order => (
                                <li key={order._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{order.customerName}</strong> – Table {order.tableNumber}
                                    </div>
                                    <span className={`badge bg-${order.status === 'Completed' ? 'success' : 'secondary'}`}>
                                        {order.status}
                                    </span>
                                </li>
                            ))}
                            {recentOrders.length === 0 && <li className="list-group-item">No orders found.</li>}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h5>Recent Reservations</h5>
                        <ul className="list-group">
                            {recentReservations.map(res => (
                                <li key={res._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{res.name}</strong> – {res.date} at {res.time}
                                    </div>
                                    <span className="badge bg-info">{res.people} people</span>
                                </li>
                            ))}
                            {recentReservations.length === 0 && <li className="list-group-item">No reservations found.</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
