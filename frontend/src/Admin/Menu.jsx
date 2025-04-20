import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './AdminNavbar';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
    const [loading, setLoading] = useState(false);

    // Fetch all menu items
    const fetchMenu = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const res = await axios.get('http://localhost:5000/api/menu', config);
            setMenuItems(res.data);
        } catch (err) {
            console.error('Failed to fetch menu', err);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add new item
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price) return;

        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/menu', form, config);
            setForm({ name: '', description: '', price: '', category: '' });
            fetchMenu();
        } catch (err) {
            console.error('Add item failed', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete item
    const deleteItem = async (id) => {
        if (!window.confirm('Delete this item?')) return;

        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            await axios.delete(`http://localhost:5000/api/menu/${id}`, config);
            fetchMenu();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3>Menu Management</h3>

                {/* Add Menu Form */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Add New Menu Item</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-3 mb-2">
                                    <input type="text" className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3 mb-2">
                                <select
  className="form-control"
  name="category"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Main Course">Main Course</option>
  <option value="Dinner">Dinner</option>
  <option value="Beverages">Beverages</option>
</select>

                                </div>
                                <div className="col-md-2 mb-2">
                                    <input type="number" className="form-control" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3 mb-2">
                                    <input type="text" className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                                </div>
                                <div className="col-md-1">
                                    <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                                        {loading ? '...' : '+'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Menu Items List */}
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map(item => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.category || '-'}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.description || '-'}</td>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteItem(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {menuItems.length === 0 && (
                                <tr><td colSpan="5" className="text-center">No items yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Menu;
