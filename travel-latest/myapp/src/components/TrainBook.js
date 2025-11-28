import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TrainBook.css";

const generateSeats = (numRows, seatsPerRow) => {
  const seats = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < seatsPerRow; j++) {
      const seatNumber = `${String.fromCharCode(65 + i)}${j + 1}`;
      seats.push({
        id: seatNumber,
        number: seatNumber,
        isBooked: Math.random() < 0.2, // simulate 20% booked
      });
    }
  }
  return seats;
};

const TrainBook = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { train, searchParams } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("");
  const [passengerDetails, setPassengerDetails] = useState([]);

  // ✅ Load seat layout
  useEffect(() => {
    if (!train) {
      navigate("/trains");
      return;
    }
    setAvailableSeats(generateSeats(5, 4));
  }, [train, navigate]);

  // ✅ Recalculate when seats change
  useEffect(() => {
    calculateTotalPrice();
    setPassengerDetails(
      selectedSeats.map(
        (seat, index) =>
          passengerDetails[index] || { name: "", age: "", gender: "" }
      )
    );
  }, [selectedSeats]);

  // ✅ Toggle seats
  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  // ✅ Calculate total
  const calculateTotalPrice = () => {
    if (!train || selectedSeats.length === 0) {
      setTotalPrice(0);
      return;
    }
    const perSeat = parseFloat(train.price?.replace(/[^\d.]/g, "")) || 0;
    setTotalPrice(selectedSeats.length * perSeat);
  };

  // ✅ Handle passenger form
  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  // ✅ Go back to trains
  const handleBackToTrains = () => {
    navigate("/trains");
  };

  // ✅ Proceed to payment
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      setBookingStatus("Please select at least one seat.");
      return;
    }

    for (let i = 0; i < passengerDetails.length; i++) {
      const { name, age, gender } = passengerDetails[i];
      if (!name || !age || !gender) {
        setBookingStatus(`Please fill all details for passenger ${i + 1}.`);
        return;
      }
    }

    setBookingStatus("Redirecting to payment gateway...");

    // ✅ Navigate to payment with full booking info
    navigate("/bank-transition", {
      state: {
        train,
        selectedSeats,
        totalPrice,
        passengerDetails,
        searchParams: {
          ...searchParams,
          date: searchParams?.date || new Date().toISOString().slice(0, 10),
          class: searchParams?.class || searchParams?.classType || "Sleeper",
        },
      },
    });
  };

  if (!train)
    return <p style={{ textAlign: "center" }}>Loading train details...</p>;

  const currencySymbolMatch = train.price?.match(/^[^\d.]+/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : "₹";

  return (
    <div className="trainbook-root">
      <h2 className="header-title">Book Your Train Journey</h2>

      <button className="back-btn" onClick={handleBackToTrains}>
        ← Back to Trains
      </button>

      {/* 🎫 Seat Layout */}
      <div className="seat-grid">
        {availableSeats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
            className={`seat-button ${
              seat.isBooked
                ? "seat-booked"
                : selectedSeats.includes(seat.id)
                ? "seat-selected"
                : "seat-available"
            }`}
            disabled={seat.isBooked}
          >
            {seat.number}
          </button>
        ))}
      </div>

      {/* 👥 Passenger Details */}
      {selectedSeats.length > 0 && (
        <>
          <h4 className="passenger-heading">Passenger Details</h4>
          {selectedSeats.map((seat, i) => (
            <div key={seat} className="passenger-card">
              <h5>Seat {seat}</h5>
              <input
                type="text"
                placeholder="Full Name"
                className="passenger-input"
                value={passengerDetails[i]?.name || ""}
                onChange={(e) =>
                  handlePassengerChange(i, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Age"
                className="passenger-input"
                value={passengerDetails[i]?.age || ""}
                onChange={(e) =>
                  handlePassengerChange(i, "age", e.target.value)
                }
              />
              <select
                className="passenger-input"
                value={passengerDetails[i]?.gender || ""}
                onChange={(e) =>
                  handlePassengerChange(i, "gender", e.target.value)
                }
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          ))}
        </>
      )}

      {/* 💰 Summary */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>
          <b>Seats Selected:</b> {selectedSeats.join(", ") || "None"}
        </p>
        <p>
          <b>Total Price:</b> {currencySymbol}
          {totalPrice.toFixed(2)}
        </p>
      </div>

      {bookingStatus && <p className="status-message">{bookingStatus}</p>}

      <button
        onClick={handleProceedToPayment}
        className="payment-button"
        disabled={selectedSeats.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default TrainBook;
