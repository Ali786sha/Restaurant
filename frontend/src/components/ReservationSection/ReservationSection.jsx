import React, { useState } from "react";
import axios from "axios";
import "./ReservationSection.css";
import reservationBg from "../../assets/img/reservation-bg.jpg";

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "",
    personCount: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // only if needed
      await axios.post("http://localhost:5000/api/reservations", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // remove if not needed
        },
      });
      alert("Reservation created successfully!");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        date: "",
        time: "",
        personCount: "",
        message: "",
      });
    } catch (err) {
      console.error("Reservation error:", err.response?.data || err.message);
      alert("Failed to create reservation.");
    }
  };

  return (
    <section
      id="gtco-reservation"
      className="bg-fixed bg-white section-padding overlay"
      style={{
        backgroundImage: `url(${reservationBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="section-content bg-white p-5 shadow">
              <div className="heading-section text-center">
                <span className="subheading">Reservation</span>
                <h2>Book Now</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="phoneNumber"
                      placeholder="Phone"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <select
                      className="form-control"
                      name="personCount"
                      value={formData.personCount}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select People</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12 form-group">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Your Message ..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <button className="btn btn-primary btn-shadow btn-lg" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
