import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, destination, date, travellers, classType } = location.state || {};

  const flights = [
    { id: 1, airline: "Air India", departure: "10:30 AM", arrival: "2:00 PM", duration: "3h 30m", price: 8500 },
    { id: 2, airline: "IndiGo", departure: "1:15 PM", arrival: "4:45 PM", duration: "3h 30m", price: 7800 },
    { id: 3, airline: "Vistara", departure: "6:00 PM", arrival: "9:30 PM", duration: "3h 30m", price: 9200 },
    { id: 4, airline: "SpiceJet", departure: "8:00 AM", arrival: "11:25 AM", duration: "3h 25m", price: 7600 },
    { id: 5, airline: "Go First", departure: "9:45 PM", arrival: "1:15 AM", duration: "3h 30m", price: 8100 },
  ];

  return (
    <div className="search-results">
      <h2>Available Flights</h2>
      <p>{from} ➝ {destination} | {date} | {classType}</p>

      <div className="flights-list">
        {flights.map((f) => (
          <div key={f.id} className="flight-card">
            <div className="flight-info">
              <h3>{f.airline}</h3>
              <p>Departure: {f.departure}</p>
              <p>Arrival: {f.arrival}</p>
              <p>Duration: {f.duration}</p>
            </div>

            <div className="flight-price">
              <p>Price: ₹{f.price}</p>
              <button
                onClick={() =>
                  navigate("/booking", {
                    state: {
                      airline: f.airline,
                      price: f.price,
                      from,
                      destination,
                      date,
                      travellers,
                      classType,
                    },
                  })
                }
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
