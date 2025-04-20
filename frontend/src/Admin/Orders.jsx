import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './AdminNavbar';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [form, setForm] = useState({
		customerName: '',
		tableNumber: '',
		selectedItems: []
	});
	const [totalPrice, setTotalPrice] = useState(0);

	// Fetch all orders
	const fetchOrders = async () => {
		const token = localStorage.getItem('token');
		const config = { headers: { Authorization: `Bearer ${token}` } };

		try {
			const res = await axios.get('http://localhost:5000/api/orders', config);
			setOrders(res.data);
		} catch (err) {
			console.error('Error fetching orders:', err.message);
		}
	};

	// Fetch all menu items
	const fetchMenu = async () => {
		const token = localStorage.getItem('token');
		const config = { headers: { Authorization: `Bearer ${token}` } };

		try {
			const res = await axios.get('http://localhost:5000/api/menu', config);
			setMenuItems(res.data);
		} catch (err) {
			console.error('Error fetching menu:', err.message);
		}
	};

	// Initial data load
	useEffect(() => {
		fetchOrders();
		fetchMenu();
	}, []);

	// Update total price whenever selectedItems change
	useEffect(() => {
		const total = form.selectedItems.reduce((sum, id) => {
			const item = menuItems.find(i => i._id === id);
			return sum + (item?.price || 0);
		}, 0);
		setTotalPrice(total);
	}, [form.selectedItems, menuItems]);

	// Form field change
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Handle item selection
	const handleItemSelect = (e) => {
		const selected = Array.from(e.target.selectedOptions, option => option.value);
		setForm({ ...form, selectedItems: selected });
	};

	// Submit new order
	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const config = { headers: { Authorization: `Bearer ${token}` } };

		try {
			await axios.post('http://localhost:5000/api/orders', {
				customerName: form.customerName,
				tableNumber: Number(form.tableNumber),
				itemIds: form.selectedItems
			}, config);
			setForm({ customerName: '', tableNumber: '', selectedItems: [] });
			setTotalPrice(0);
			fetchOrders();
		} catch (err) {
			console.error('Order creation failed:', err.response?.data || err.message);
			alert('Error creating order. Please check inputs.');
		}
	};

	// Delete order
	const deleteOrder = async (id) => {
		const token = localStorage.getItem('token');
		const config = { headers: { Authorization: `Bearer ${token}` } };

		if (window.confirm("Delete this order?")) {
			await axios.delete(`http://localhost:5000/api/orders/${id}`, config);
			fetchOrders();
		}
	};

	// Complete order
	const completeOrder = async (id) => {
		const token = localStorage.getItem('token');
		const config = { headers: { Authorization: `Bearer ${token}` } };

		await axios.patch(`http://localhost:5000/api/orders/${id}/complete`, {}, config);
		fetchOrders();
	};

	return (
		<>
			<Navbar />
			<div className="container mt-4">
				<h3>Order Management</h3>

				{/* Add Order */}
				<div className="card mb-4">
					<div className="card-body">
						<h5>Create New Order</h5>
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-3 mb-2">
									<input
										type="text"
										className="form-control"
										name="customerName"
										placeholder="Customer Name"
										value={form.customerName}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-md-2 mb-2">
									<input
										type="number"
										className="form-control"
										name="tableNumber"
										placeholder="Table #"
										value={form.tableNumber}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-md-5 mb-2">
									<select
										multiple
										className="form-select"
										value={form.selectedItems}
										onChange={handleItemSelect}
										required
										style={{ height: '150px' }}
									>
										{menuItems.map(item => (
											<option key={item._id} value={item._id}>
												{item.name} - ₹{item.price}
											</option>
										))}
									</select>
								</div>
								<div className="col-md-2 mb-2 d-flex flex-column">
									<strong>Total: ₹{totalPrice}</strong>
									<button type="submit" className="btn btn-dark mt-auto">Add</button>
								</div>
							</div>
						</form>
					</div>
				</div>

				{/* Orders Table */}
				<div className="table-responsive">
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Customer</th>
								<th>Table #</th>
								<th>Items</th>
								<th>Total</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order._id}>
									<td>{order.customerName}</td>
									<td>{order.tableNumber}</td>
									<td>
										<ul className="mb-0">
											{order.items.map(item => (
												<li key={item._id}>{item.name}</li>
											))}
										</ul>
									</td>
									<td>₹{order.totalPrice}</td>
									<td>
										<span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
											{order.status}
										</span>
									</td>
									<td>
										{order.status === 'Pending' && (
											<button onClick={() => completeOrder(order._id)} className="btn btn-sm btn-success me-1">
												Complete
											</button>
										)}
										<button onClick={() => deleteOrder(order._id)} className="btn btn-sm btn-danger">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Orders;
