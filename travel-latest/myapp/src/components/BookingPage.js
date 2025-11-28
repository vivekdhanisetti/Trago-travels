import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    from,
    destination,
    date,
    travellers: totalTravellers,
    classType,
    airline,
    price,
  } = location.state || {};

  const [travellers, setTravellers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [success, setSuccess] = useState("");

  const [errors, setErrors] = useState({
    mobile: "",
    pincode: "",
    email: "",
  });

  const [currentTraveller, setCurrentTraveller] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    age: "",
    pincode: "",
    state: "",
  });

  const handleAddTraveller = () => {
    setShowForm(true);
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    setSuccess("");

    if (name === "mobile") {
      if (/^\d{0,10}$/.test(value)) {
        setCurrentTraveller({ ...currentTraveller, [name]: value });
      }
      return;
    }

    if (name === "pincode") {
      if (/^\d{0,6}$/.test(value)) {
        setCurrentTraveller({ ...currentTraveller, [name]: value });
      }
      return;
    }

    setCurrentTraveller({ ...currentTraveller, [name]: value });
  };

  const handleSaveTraveller = () => {
    const { firstName, gender, mobile, pincode, email } = currentTraveller;
    const newErrors = {};

    if (!firstName || !gender) {
      alert("Please fill at least first name and gender.");
      return;
    }

    if (mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    if (pincode.length !== 6) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    if (email && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedTravellers = [...travellers, currentTraveller];
    setTravellers(updatedTravellers);
    setCurrentTraveller({
      firstName: "",
      lastName: "",
      gender: "",
      mobile: "",
      email: "",
      age: "",
      pincode: "",
      state: "",
    });
    setShowForm(false);
    setErrors({});
    setSuccess("✅ Traveller added successfully!");
  };

  const handleContinue = () => {
    localStorage.setItem("travellers", JSON.stringify(travellers));
    setShowReview(true);
  };

  const handleEdit = () => {
    setShowReview(false);
    setSuccess("");
  };

  const handleConfirm = () => {
    localStorage.setItem("travellers", JSON.stringify(travellers));
    localStorage.setItem(
      "flightDetails",
      JSON.stringify({
        from,
        destination,
        date,
        price,
        airline,
        travellers: totalTravellers,
        classType,
      })
    );
    navigate("/seats");
  };

  return (
    <div className="booking-container">
      <h2 className="title">Review & Book</h2>

      {/* Flight Summary Card */}
      <div className="flight-summary-card">
        <h3>Flight Summary</h3>
        <div className="summary-box">
          <p><strong>{airline}</strong></p>
          <p>{from} ➝ {destination}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Travellers:</strong> {totalTravellers}</p>
          <p><strong>Class:</strong> {classType}</p>
        </div>
        <div className="price-box">
          <p>Total Fare</p>
          <h2>₹{price}</h2>
        </div>
      </div>

      <div className="booking-wrapper">
        <div className="left-section">
          <h3>Traveller Information</h3>

          <button className="add-btn" onClick={handleAddTraveller}>
            ➕ Add Traveller
          </button>

          {success && <p className="success">{success}</p>}

          {showForm && (
            <div className="traveller-form">
              <div className="row two-column">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={currentTraveller.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={currentTraveller.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row gender-row">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={currentTraveller.gender === "Male"}
                    onChange={handleInputChange}
                  /> Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={currentTraveller.gender === "Female"}
                    onChange={handleInputChange}
                  /> Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={currentTraveller.gender === "Other"}
                    onChange={handleInputChange}
                  /> Other
                </label>
              </div>

              {/* ✅ Age & Mobile side by side */}
              <div className="row two-column">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={currentTraveller.age}
                  onChange={handleInputChange}
                />
                <div className="field-with-error">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={currentTraveller.mobile}
                    onChange={handleInputChange}
                    maxLength="10"
                  />
                  {errors.mobile && <p className="error">{errors.mobile}</p>}
                </div>
              </div>

              {/* ✅ Email & Pincode side by side */}
              <div className="row two-column">
                <div className="field-with-error">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={currentTraveller.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="field-with-error">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={currentTraveller.pincode}
                    onChange={handleInputChange}
                    maxLength="6"
                  />
                  {errors.pincode && <p className="error">{errors.pincode}</p>}
                </div>
              </div>

              <input
                type="text"
                name="state"
                placeholder="State"
                value={currentTraveller.state}
                onChange={handleInputChange}
              />

              <button className="save-btn" onClick={handleSaveTraveller}>
                Save Traveller
              </button>
            </div>
          )}

          {travellers.length > 0 && !showReview && (
            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
          )}

          {showReview && (
            <div className="review-card">
              <h4>Review Traveller</h4>
              <p className="note">Please ensure names match Govt ID</p>

              {travellers.map((t, index) => (
                <div key={index} className="review-item">
                  <p><strong>Name:</strong> {t.firstName} {t.lastName}</p>
                  <p><strong>Gender:</strong> {t.gender}</p>
                </div>
              ))}

              <div className="review-buttons">
                <button className="edit-btn" onClick={handleEdit}>
                  ✏ Edit
                </button>
                <button className="confirm-btn" onClick={handleConfirm}>
                  ✅ Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;