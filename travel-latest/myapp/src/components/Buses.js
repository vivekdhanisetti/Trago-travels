import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/India";
import { generateBuses } from "../data/busesData";
import "./Buses.css";

const Buses = () => {
  const [form, setForm] = useState({ from: "", to: "", date: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.date) {
      alert("Please fill all required fields!");
      return;
    }
    if (form.from === form.to) {
      alert("From and To cities cannot be the same!");
      return;
    }
    const filtered = generateBuses(form.from, form.to, form.date);
    navigate("/busesresult", { state: { results: filtered, form } });
  };

  const handleLiveTrack = () => {
    navigate("/live-tracking");
  };

  return (
    <div className="buses-section">
      <div className="bus-search-box">
        <h2 className="section-title">Book Your Bus</h2>

        <form className="search-fields" onSubmit={handleSubmit}>
          <div className="row">
            <select name="from" value={form.from} onChange={handleChange}>
              <option value="">From City</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select name="to" value={form.to} onChange={handleChange}>
              <option value="">To City</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="row single">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="search-btn">
            🔍 Search Buses
          </button>

          <button
            type="button"
            className="live-track-btn"
            onClick={handleLiveTrack}
          >
            🚍 Live Track Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default Buses;
