import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, selectedSeats, form } = location.state || {};

  // Merge full trip details
  const fullBusInfo = { ...bus, from: form?.from, to: form?.to, date: form?.date };

  // Retrieve logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));
  const bookedBy = user?.email || user?.username || "guest_user";

  // Setup passenger state
  const [passengers, setPassengers] = useState(
    selectedSeats ? selectedSeats.map(() => ({ name: "", phone: "", gender: "Male" })) : []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);

  if (!bus || !selectedSeats) {
    return (
      <div className="payment-error">
        <h2>⚠️ No Booking Data Found</h2>
        <p>Please go back and select your seats again.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const handleChange = (idx, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[idx][field] = value;
    setPassengers(newPassengers);
  };

  const handlePayment = async () => {
    if (isSubmitting || hasSubmittedRef.current) return; // ✅ Prevent double submit
    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    for (let p of passengers) {
      if (!p.name || !p.phone) {
        alert("Please fill all passenger details!");
        setIsSubmitting(false);
        hasSubmittedRef.current = false;
        return;
      }
    }

    const totalFare = selectedSeats.length * bus.fare;

    const bookingData = {
      operator: fullBusInfo.operator,
      fromCity: fullBusInfo.from,
      toCity: fullBusInfo.to,
      travelDate: fullBusInfo.date,
      departTime: fullBusInfo.depart,
      arriveTime: fullBusInfo.arrive,
      seatNumbers: selectedSeats.join(", "),
      totalFare,
      passengerDetails: JSON.stringify(passengers),
      bookingTime: new Date().toISOString(),
      bookedBy,
    };

    try {
      const res = await fetch("http://localhost:8080/api/tickets/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.status === 409) {
        alert("⚠️ Seat already booked for this route and date!");
        setIsSubmitting(false);
        hasSubmittedRef.current = false;
        return;
      }

      if (res.ok) {
        alert("✅ Payment Successful! Booking saved.");
        navigate("/ticket", { state: { bus: fullBusInfo, selectedSeats, passengers } });
      } else {
        alert("❌ Failed to save booking.");
        setIsSubmitting(false);
        hasSubmittedRef.current = false;
      }
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("⚠️ Error connecting to backend.");
      setIsSubmitting(false);
      hasSubmittedRef.current = false;
    }
  };

  const totalFare = selectedSeats.length * bus.fare;

  return (
    <div className="payment-page">
      <h2>💳 Payment for {bus.operator}</h2>

      <div className="trip-summary">
        <p><strong>Route:</strong> {fullBusInfo.from} → {fullBusInfo.to}</p>
        <p><strong>Date:</strong> {fullBusInfo.date}</p>
        <p><strong>Total Fare:</strong> ₹{totalFare}</p>
        <p><strong>Booked By:</strong> {bookedBy}</p>
      </div>

      <h3>Passenger Details</h3>
      {passengers.map((p, idx) => (
        <div key={idx} className="passenger-card">
          <h4>Seat {selectedSeats[idx]}</h4>
          <input
            type="text"
            placeholder="Name"
            value={p.name}
            onChange={(e) => handleChange(idx, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={p.phone}
            onChange={(e) => handleChange(idx, "phone", e.target.value)}
          />
          <select
            value={p.gender}
            onChange={(e) => handleChange(idx, "gender", e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      ))}

      <h3>UPI Payment</h3>
      <p>Scan the QR code below to pay securely via UPI:</p>
      <div className="qr-code">
        <QRCode value={`upi://pay?pa=yourupiid@upi&pn=BusBooking&am=${totalFare}&cu=INR`} />
      </div>

      <button className="primary-btn" onClick={handlePayment} disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "✅ Confirm Payment"}
      </button>
    </div>
  );
};

export default Payment;
