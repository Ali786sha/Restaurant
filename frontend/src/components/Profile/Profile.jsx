import React, { useEffect, useState } from "react";
import axios from '../../axiosConfig';
import Navbar from "../Navbar/Navbar";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState({ name: false, email: false });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user data
  useEffect(() => {
	axios
	  .get("/user/profile", {
		headers: {
		  Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	  })
	  .then((res) => {
		console.log("API Response:", res.data);  // 👈 check this
		setUser(res.data);
		setFormData({ name: res.data.name, email: res.data.email });
	  })
	  .catch((err) => {
		console.error(err);
	  });
  }, []);
  

  const handleFieldToggle = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "/user/profile",
        {
          name: formData.name,
          email: formData.email,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data);
      setEditMode({ name: false, email: false });
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
	<Navbar />
	<div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        <FaUserCircle size={80} className="text-secondary" />
        <h2 className="mt-2">User Profile</h2>
      </div>

      <div className="card p-4 shadow">
        {/* Name */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="flex-grow-1 me-2">
            <label className="form-label">Name</label>
            {editMode.name ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <p className="form-control-plaintext">{user.name || "Loading..."}</p>
            )}
          </div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleFieldToggle("name")}
          >
            {editMode.name ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Email */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="flex-grow-1 me-2">
            <label className="form-label">Email</label>
            {editMode.email ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <p className="form-control-plaintext">{user.email}</p>
            )}
          </div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleFieldToggle("email")}
          >
            {editMode.email ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Change Password</label>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
          />
        </div>

        {message && <div className="alert alert-info mt-2">{message}</div>}

        <button className="btn btn-primary w-100 mt-3" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
	</>
  );
};

export default Profile;
