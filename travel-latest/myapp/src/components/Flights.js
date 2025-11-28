import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Flights.css";

const currencyList = [
  { code: "USD", name: "United States", flag: "🇺🇸" },
  { code: "GBP", name: "United Kingdom", flag: "🇬🇧" },
  { code: "EUR", name: "Europe", flag: "🇪🇺" },
  { code: "AED", name: "UAE", flag: "🇦🇪" },
  { code: "SGD", name: "Singapore", flag: "🇸🇬" },
  { code: "AUD", name: "Australia", flag: "🇦🇺" },
  { code: "CAD", name: "Canada", flag: "🇨🇦" },
  { code: "THB", name: "Thailand", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysia", flag: "🇲🇾" },
  { code: "QAR", name: "Qatar", flag: "🇶🇦" },
  { code: "SAR", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "JPY", name: "Japan", flag: "🇯🇵" },
  { code: "KRW", name: "Korea", flag: "🇰🇷" },
  { code: "TRY", name: "Turkey", flag: "🇹🇷" },
  { code: "OMR", name: "Oman", flag: "🇴🇲" },
  { code: "VND", name: "Vietnam", flag: "🇻🇳" },
  { code: "IDR", name: "Indonesia", flag: "🇮🇩" },
];

const Flights = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("1 Traveller");
  const [classType, setClassType] = useState("Economy");

  // Currency Converter
  const [amount, setAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState("USD");
  const [rate, setRate] = useState(0);
  const [convertedValue, setConvertedValue] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  const fetchRate = async () => {
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
      const data = await res.json();
      setRate(data.rates[toCurrency]);
      setUpdateTime(new Date().toLocaleTimeString());
    } catch (err) {
      alert("Currency API Error");
    }
  };

  useEffect(() => {
    fetchRate();
  }, [toCurrency]);

  useEffect(() => {
    if (rate) {
      setConvertedValue((amount * rate).toFixed(2));
    }
  }, [amount, rate]);

  const handleSearch = () => {
    if (!from || !destination || !date) {
      alert("Please fill all required fields!");
      return;
    }

    navigate("/search", {
      state: { from, destination, date, travellers, classType },
    });
  };

  return (
    <div className="flights-section">
      {/* ✈️ Flight Search Box */}
      <div className="flight-search-box">
        <h2 className="section-title">Book Your Flight</h2>

        <div className="search-fields">
          <div className="row">
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">From (India)</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Hyderabad</option>
            </select>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Destination Country</option>
              {currencyList.map((c) => (
                <option key={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
            >
              <option>1 Traveller</option>
              <option>2 Travellers</option>
              <option>3 Travellers</option>
              <option>4 Travellers</option>
            </select>
          </div>

          <div className="row single">
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            🔍 Search Flights
          </button>
        </div>
      </div>

      {/* 💱 Currency Converter Card */}
      <div className="currency-card">
        <h2>💱 Currency Converter</h2>

        <input
          type="number"
          className="input-box"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in INR"
        />

        <select
          className="input-box"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencyList.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code} — {c.name}
            </option>
          ))}
        </select>

        <div className="converter-output">
          <p>
            ✅ {amount} INR = <b>{convertedValue} {toCurrency}</b>
          </p>
          <p className="rate-info">Updated: {updateTime}</p>
        </div>
      </div>

      {/* ✨ Offers Section */}
      <div className="offers-section">
        <h2 className="offers-title">✨ Offers for You</h2>

        <div className="offers-container">
          <div className="offer-card">
            <img src="/images/image5.jpg" alt="Offer 1" />
            <h3>Let's Travel – 50% Off on All Flights</h3>
            <button className="offer-btn">Get Offer</button>
          </div>

          <div className="offer-card">
            <img src="/images/image6.jpg" alt="Offer 2" />
            <h3>Travel Sale – Save 50% Today!</h3>
            <button className="offer-btn">Get Offer</button>
          </div>

          <div className="offer-card">
            <img src="/images/image7.jpg" alt="Offer 3" />
            <h3>Super Sale – Fly More, Pay Less!</h3>
            <button className="offer-btn">Get Offer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
