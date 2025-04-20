import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './AdminNavbar';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    name: '',
    tableNumber: '',
    date: '',
    time: ''
  });

  // Fetch existing reservations
  const fetchReservations = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.get('http://localhost:5000/api/reservations', config);
      setReservations(res.data);
    } catch (err) {
      console.error('Error fetching reservations:', err.message);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.post('http://localhost:5000/api/reservations', {
        ...form,
        tableNumber: Number(form.tableNumber)
      }, config);
      alert('Reservation created!');
      setForm({ name: '', tableNumber: '', date: '', time: '' });
      fetchReservations();
    } catch (err) {
      console.error('Error creating reservation:', err.response?.data || err.message);
      alert('Failed to create reservation.');
    }
  };

  const deleteReservation = async (id) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (window.confirm('Delete this reservation?')) {
      try {
        await axios.delete(`http://localhost:5000/api/reservations/${id}`, config);
        fetchReservations();
      } catch (err) {
        console.error('Error deleting reservation:', err.message);
        alert('Failed to delete reservation.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Reservations</h3>

        {/* Create New Reservation */}
        <div className="card mb-4">
          <div className="card-body">
            <h5>New Reservation</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3 mb-2">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <input
                    type="number"
                    name="tableNumber"
                    className="form-control"
                    placeholder="Table #"
                    value={form.tableNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <button className="btn btn-dark w-100" type="submit">Book</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Reservation List */}
        <div className="table-responsive">
          <table className="table table-bordered">
          <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Table</th>
    <th>Date</th>
    <th>Time</th>
    <th>Persons</th>
    <th>Message</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {reservations.map(res => (
    <tr key={res._id}>
      <td>{res.name}</td>
      <td>{res.email || '-'}</td>
      <td>{res.phoneNumber || '-'}</td>
      <td>{res.tableNumber || '-'}</td>
      <td>{res.date}</td>
      <td>{res.time}</td>
      <td>{res.personCount || '-'}</td>
      <td>{res.message || '-'}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteReservation(res._id)}>Delete</button>
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

export default Reservation;
