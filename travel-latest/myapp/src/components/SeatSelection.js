import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = () => {
  const navigate = useNavigate();

  // Get travellers list from localStorage (from previous booking page)
  const storedTravellers = JSON.parse(localStorage.getItem("travellers")) || [];
  const totalTravellers = storedTravellers.length || 1;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = 10;
  const cols = ["A", "B", "C", "D", "E", "F"];

  // Example occupied seats
  const occupiedSeats = ["1B", "2D", "3F", "4A", "6C", "7E", "9B", "10F"];

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    // If seat already selected → unselect it
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      return;
    }

    // Prevent selecting more than allowed
    if (selectedSeats.length >= totalTravellers) {
      alert(`You can select only ${totalTravellers} seat${totalTravellers > 1 ? "s" : ""}.`);
      return;
    }

    setSelectedSeats([...selectedSeats, seat]);
  };

  const handleConfirmSeat = () => {
    if (selectedSeats.length !== totalTravellers) {
      alert(`Please select ${totalTravellers} seat${totalTravellers > 1 ? "s" : ""}.`);
      return;
    }

    // ✅ Save selected seats to localStorage
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    // ✅ Navigate to payment page
    navigate("/payment-page");
  };

  return (
    <div className="seat-selection">
      <h2>✈ Seat Selection</h2>
      <p>Select {totalTravellers} seat{totalTravellers > 1 ? "s" : ""}</p>

      <div className="plane-view">
        {[...Array(rows)].map((_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={rowNumber} className="seat-row">
              {cols.map((col) => {
                const seat = `${rowNumber}${col}`;
                const isOccupied = occupiedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    className={`seat 
                      ${isOccupied ? "occupied" : ""} 
                      ${isSelected ? "selected" : ""} 
                      ${col === "D" ? "gap-left" : ""}
                    `}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isOccupied}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="seat-footer">
        <p>
          Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong>
        </p>
        <button className="confirm-seat-btn" onClick={handleConfirmSeat}>
          Confirm Seats
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
