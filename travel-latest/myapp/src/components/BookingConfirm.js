import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingConfirm.css";

const BookingConfirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    train,
    selectedSeats = [],
    totalPrice = 0,
    passengerDetails = [],
    searchParams = {},
    paymentMethod = "Credit Card",
  } = state || {};

  // ✅ Confirm booking & save to backend
  const handleConfirm = async () => {
    try {
      const bookingData = {
        email: localStorage.getItem("userEmail") || "2300033759@kluniversity.in",
        trainName: train?.name,
        source: searchParams?.from,
        destination: searchParams?.to,
        travelClass: searchParams?.class,
        travelDate: searchParams?.date,
        seats: selectedSeats,
        passengers: passengerDetails,
        totalFare: totalPrice,
        paymentMethod,
      };

      console.log("🚀 Final booking data:", bookingData);

      await axios.post("http://localhost:8080/api/bookings/save", bookingData);
      alert("✅ Booking confirmed successfully!");

      navigate("/ticket", {
        state: {
          train,
          selectedSeats,
          passengerDetails,
          totalPrice,
          searchParams,
          paymentMethod,
        },
      });
    } catch (error) {
      console.error("❌ Booking confirmation failed:", error);
      alert("Booking failed. Please try again later.");
    }
  };

  if (!train)
    return <p style={{ textAlign: "center" }}>No booking details found.</p>;

  return (
    <div className="confirm-page">
      <div className="confirm-card glass-card">
        <h2>✅ Train Booking Confirmation</h2>

        <p>
          <b>Train:</b> {train.name} ({train.number})
        </p>
        <p>
          <b>Route:</b> {searchParams.from} → {searchParams.to}
        </p>
        <p>
          <b>Date:</b> {searchParams.date}
        </p>
        <p>
          <b>Class:</b> {searchParams.class}
        </p>
        <p>
          <b>Seats:</b> {selectedSeats.join(", ")}
        </p>
        <p>
          <b>Total Fare:</b> ₹{totalPrice.toFixed(2)}
        </p>
        <p>
          <b>Payment Method:</b> {paymentMethod}
        </p>

        <h3>Passenger Details</h3>
        <table>
          <thead>
            <tr>
              <th>Seat</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {passengerDetails.map((p, idx) => (
              <tr key={idx}>
                <td>{selectedSeats[idx]}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="print-btn" onClick={handleConfirm}>
          Confirm & Download Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingConfirm;
