import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 🧠 AI Components
import ChatWidget from "./components/ChatWidget";

// 🌍 Main Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Travel from "./components/Travel";

//Profile
import Profile from "./components/Profile";

// Other components...
import Offers from "./components/Offers";
import CustomerCare from "./components/CustomerCare";
import Help from "./components/Help";
import About from "./components/About";
import ContactUs from "./components/ContactUs";

// Bookings and Travel Components
import Flights from "./components/Flights";
import Trains from "./components/Trains";
import Hotels from "./components/Hotels";
import Buses from "./components/Buses";
import BusesResult from "./components/BusesResult";
import SelectSeats from "./components/SelectSeats";
import Payment from "./components/Payment";
import BookingConfirm from "./components/BookingConfirm";
import TicketPrint from "./components/TicketPrint";

import TrainBook from "./components/TrainBook";
import TrainResults from "./components/TrainResults";
import BookingConfirmation from "./components/BookingConfirmation";
import BankTransition from "./components/BankTransition";

import Cabs from "./components/Cabs";

// 🔐 Forgot Password Flow
import ForgotPassword from "./components/ForgotPassword";
import OtpVerification from "./components/OtpVerification";
import ResetPassword from "./components/ResetPassword";

// Search Results and Booking Flow
import SearchResults from "./components/SearchResults";
import BookingPage from "./components/BookingPage";
import SeatSelection from "./components/SeatSelection";
import PaymentPage from "./components/PaymentPage";
import TrainFood from "./components/TrainFood";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 🔹 All App Routes */}
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />

          {/* Profile Pages */}
         

          {/* Forgot Password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Bookings Pages */}
          <Route path="/flights" element={<Flights />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/busesresult" element={<BusesResult />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm-booking" element={<BookingConfirm />} />
          <Route path="/ticket" element={<TicketPrint />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="/train-book" element={<TrainBook />} />
          <Route path="/train-results" element={<TrainResults />} />
          <Route path="/bank-transition" element={<BankTransition />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />

          {/* Search Results and Booking Flow */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/payment-page" element={<PaymentPage />} />

          {/* Train Food */}
          <Route path="/train-food" element={<TrainFood />} />

          {/* Cabs */}
          <Route path="/cabs" element={<Cabs />} />
        </Routes>

        {/* 💬 AI Chatbot always visible */}
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
