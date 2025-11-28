import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Travel.css";

import Flights from "./Flights";
import Trains from "./Trains";
import Hotels from "./Hotels";
import Buses from "./Buses";
import Cabs from "./Cabs";

const Travel = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ FIXED

  // Toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Header Banner */}
      <div className="header-banner">
        <img
          src="/images/image9.png"
          alt="Travel Header"
          className="travel-header-image"
        />
        <div className="header-overlay">
          <h2 className="header-title">Explore the World with TRAGO</h2>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="travel-navbar">
        <h1 className="brand-title">TRAGO Booking</h1>

        <ul className="nav-links">
          <li>
            <Link className="nav-link" to="/offers">Offers</Link>
          </li>
          <li>
            <Link className="nav-link" to="/customer-care">Customer Care</Link>
          </li>
          <li>
            <Link className="nav-link" to="/help">Help</Link>
          </li>

          {/* PROFILE DROPDOWN */}
          <li>
            <div className="profile-container" ref={dropdownRef}>
              <div className="profile-icon" onClick={toggleDropdown}>
                <img src="/images/trago1.jpg" alt="Profile" />
              </div>

              {isDropdownOpen && (
                <div className="dropdown">
                  <ul>
                    <li onClick={() => navigate("/profile")}>My Profile</li>
                    <li onClick={() => navigate("/settings")}>Settings</li>
                    <li onClick={() => navigate("/bookings")}>Bookings</li>
                    <li onClick={handleLogout} style={{ color: "red" }}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>

      {/* Tabs */}
      <div className="booking-card">
        <button
          className={`tab-item ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          ✈️ Flights
        </button>

        <button
          className={`tab-item ${activeTab === "trains" ? "active" : ""}`}
          onClick={() => setActiveTab("trains")}
        >
          🚆 Trains
        </button>

        <button
          className={`tab-item ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          🏨 Hotels
        </button>

        <button
          className={`tab-item ${activeTab === "buses" ? "active" : ""}`}
          onClick={() => setActiveTab("buses")}
        >
          🚌 Buses
        </button>
      </div>

      {/* Content Switch */}
      <div className="tab-content">
        {activeTab === "flights" && <Flights />}
        {activeTab === "trains" && <Trains />}
        {activeTab === "hotels" && <Hotels />}
        {activeTab === "buses" && <Buses />}
        {activeTab === "cabs" && <Cabs />}
      </div>
    </>
  );
};

export default Travel;
