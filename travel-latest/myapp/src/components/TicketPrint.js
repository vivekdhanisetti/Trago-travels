import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TicketPrint.css";

const TicketPrint = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bus, selectedSeats, passengers } = state || {};
  const [isSaved, setIsSaved] = useState(false);
  const hasSavedRef = useRef(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const bookedBy = user?.email || user?.username || "guest_user";

  const bookingData =
    bus && selectedSeats && passengers
      ? {
          operator: bus.operator,
          fromCity: bus.from,
          toCity: bus.to,
          travelDate: bus.date,
          departTime: bus.depart,
          arriveTime: bus.arrive,
          seatNumbers: selectedSeats.join(", "),
          totalFare: selectedSeats.length * bus.fare,
          passengerDetails: JSON.stringify(passengers),
          bookingTime: new Date().toISOString(),
          bookedBy,
        }
      : null;

  useEffect(() => {
    const saveTicketToDB = async () => {
      if (!bookingData || hasSavedRef.current) return;
      hasSavedRef.current = true;

      try {
        const res = await fetch("http://localhost:8080/api/tickets/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (res.ok) {
          console.log("✅ Ticket saved successfully");
          setIsSaved(true);
        } else {
          console.error("❌ Failed to save ticket");
        }
      } catch (err) {
        console.error("Error saving ticket:", err);
      }
    };

    saveTicketToDB();
  }, [bookingData]);

  if (!bus || !selectedSeats || !passengers) {
    return (
      <div className="ticket-error">
        <h2>⚠️ No Ticket Data Found</h2>
        <p>Please go back and complete your booking.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const handlePrint = () => window.print();

  return (
    <div className="ticket-page">
      <div className="ticket-card">
        <h1>🎟 Bus Ticket</h1>
        <p><strong>Operator:</strong> {bus.operator}</p>
        <p><strong>Route:</strong> {bus.from} → {bus.to}</p>
        <p><strong>Date:</strong> {bus.date}</p>
        <p><strong>Departure:</strong> {bus.depart} | <strong>Arrival:</strong> {bus.arrive}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Total Fare:</strong> ₹{selectedSeats.length * bus.fare}</p>
        <p><strong>Booked By:</strong> {bookedBy}</p>

        <h3>Passenger Details</h3>
        <table>
          <thead>
            <tr>
              <th>Seat</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((p, idx) => (
              <tr key={idx}>
                <td>{selectedSeats[idx]}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="print-ticket-btn" onClick={handlePrint}>
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketPrint;
