import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import { generateTicketPDF } from "../components/generateTicketPDF";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUPIApp, setSelectedUPIApp] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flightDetails, setFlightDetails] = useState(null);
  const [travellers, setTravellers] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    setSelectedSeats(JSON.parse(localStorage.getItem("selectedSeats")) || []);
    setFlightDetails(JSON.parse(localStorage.getItem("flightDetails")) || {});
    setTravellers(JSON.parse(localStorage.getItem("travellers")) || []);
  }, []);

  // 🔹 Handle Payment Option
  const handlePayment = () => {
    if (!selectedOption) return alert("Please select a payment method!");
    if (selectedOption === "upi" && !selectedUPIApp)
      return alert("Please select a UPI app!");

    if (selectedOption === "upi") {
      setShowOTP(true);
      return;
    }

    startAnimation();
  };

  // 🔹 Show Animation and Process Payment
  const startAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      handleSuccess();
    }, 3000);
  };

  // 🔹 Verify OTP for UPI
  const handleVerifyOTP = () => {
    if (otp.length !== 6) return alert("Enter a valid 6-digit OTP!");
    setShowOTP(false);
    startAnimation();
  };

  // 🔹 Handle Payment Success
  const handleSuccess = async () => {
    setPaymentSuccess(true);

    const details = {
      travellerName:
        travellers[0]?.firstName + " " + travellers[0]?.lastName || "Passenger",
      email: travellers[0]?.email || "-",
      phone: travellers[0]?.mobile || "-",
      fromLocation: flightDetails?.from,
      destination: flightDetails?.destination,
      date: flightDetails?.date,
      airline: flightDetails?.airline || flightDetails?.flightNo || "N/A",
      classType: flightDetails?.classType,
      seats: selectedSeats.join(", "),
      price: flightDetails?.price,
      bookingId: "BK" + Math.floor(100000 + Math.random() * 900000),
    };

    // ✅ Send booking details to backend
    try {
      const response = await fetch("http://localhost:8080/api/flightsbooking/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        console.log("Booking saved successfully in database.");
      } else {
        console.error("Failed to save booking:", response.status);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }

    // ✅ Generate Ticket PDF
    await generateTicketPDF(details);
  };

  // 🔹 Payment processing animation
  if (showAnimation) {
    return (
      <div className="payment-animation-container">
        <div className="plane">✈</div>
        <div className="payment-animation-text">Processing payment...</div>
      </div>
    );
  }

  // 🔹 OTP Verification UI
  if (showOTP) {
    return (
      <div className="otp-screen">
        <h2>Enter OTP sent to your UPI App</h2>
        <input
          type="number"
          className="otp-input"
          maxLength="6"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
        />
        <button onClick={handleVerifyOTP}>Verify OTP ✅</button>
      </div>
    );
  }

  // 🔹 Success Screen
  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <h2>✅ Payment Successful</h2>
        <p>Your flight booking is confirmed!</p>
        <h1>✈</h1>
        <p>Your ticket is being downloaded...</p>
      </div>
    );
  }

  // 🔹 Main Payment Page
  return (
    <div className="payment-wrapper">
      {/* Trip Summary */}
      <div className="summary-card">
        <h2>🧾 Trip Summary</h2>
        {flightDetails ? (
          <>
            <p>
              <strong>From:</strong> {flightDetails.from}
            </p>
            <p>
              <strong>To:</strong> {flightDetails.destination}
            </p>
            <p>
              <strong>Date:</strong> {flightDetails.date}
            </p>
            <p>
              <strong>Travellers:</strong> {travellers.length}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Class:</strong> {flightDetails.classType}
            </p>
            <h3>💰 Total: ₹{flightDetails.price}</h3>
          </>
        ) : (
          <p>No flight details found.</p>
        )}
      </div>

      {/* Payment Options */}
      <div className="payment-card">
        <h2>💳 Payment Options</h2>

        {/* UPI */}
        <div
          className={`method ${selectedOption === "upi" ? "active" : ""}`}
          onClick={() => setSelectedOption("upi")}
        >
          🟣 UPI
        </div>

        {selectedOption === "upi" && (
          <>
            <div className="upi-apps">
              {["PhonePe", "Google Pay", "Paytm", "BHIM"].map((app) => (
                <div
                  key={app}
                  className={`upi-option ${
                    selectedUPIApp === app ? "selected" : ""
                  }`}
                  onClick={() => setSelectedUPIApp(app)}
                >
                  <p>{app}</p>
                </div>
              ))}
            </div>
            <input
              type="text"
              className="upi-input"
              placeholder="Enter UPI ID (e.g., user@upi)"
            />
          </>
        )}

        {/* Card */}
        <div
          className={`method ${selectedOption === "card" ? "active" : ""}`}
          onClick={() => setSelectedOption("card")}
        >
          💳 Credit / Debit Card
        </div>

        {selectedOption === "card" && (
          <div className="card-box">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Cardholder Name" />
            <div className="row">
              <input type="text" placeholder="MM/YY" />
              <input type="password" placeholder="CVV" />
            </div>
          </div>
        )}

        {/* Net Banking */}
        <div
          className={`method ${
            selectedOption === "netbanking" ? "active" : ""
          }`}
          onClick={() => setSelectedOption("netbanking")}
        >
          🏦 Net Banking
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay ₹{flightDetails?.price || 0}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
