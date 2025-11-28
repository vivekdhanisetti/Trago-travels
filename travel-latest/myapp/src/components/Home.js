import React from "react";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/images/trago1.jpg" alt="Travel" width="30" height="24" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contactus">Contact Us</Link>
                </li>
              </ul>

              <div>
                <button className="btn btn-primary me-2" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn btn-secondary" onClick={() => navigate("/signup")}>
                  Signup
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section with Video Background and Image Card */}
      <div className="hero-section text-white text-center d-flex flex-column justify-content-center align-items-center">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content hero-image-card">
          <img 
            src="/images/trago1.jpg" 
            alt="TRAGO Booking" 
            className="hero-card-image" 
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="py-5">
        <div className="container">
          {/* Popular Destinations */}
          <section className="text-center mb-5">
            <h2 className="mb-4">Popular Destinations</h2>
            <div className="horizontal-scroll">
              <div className="card shadow-sm">
                <img src="/images/image1.png" className="card-img-top" alt="Vizag" />
                <div className="card-body">
                  <h5 className="card-title">Vizag</h5>
                  <p className="card-text">Beautiful beaches and hills await you in Vizag.</p>
                </div>
              </div>

              <div className="card shadow-sm">
                <img src="/images/image3.jpeg" className="card-img-top" alt="Tirupati" />
                <div className="card-body">
                  <h5 className="card-title">Tirupathi</h5>
                  <p className="card-text">Famous pilgrimage city for spiritual journeys.</p>
                </div>
              </div>

              <div className="card shadow-sm">
                <img src="/images/image4.jpeg" className="card-img-top" alt="Bangalore" />
                <div className="card-body">
                  <h5 className="card-title">Bangalore</h5>
                  <p className="card-text">The tech hub with vibrant culture and nightlife.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="text-center mb-5">
            <h2 className="mb-4">Why Choose Us?</h2>
            <div className="horizontal-scroll">
              <div className="why-box">
                <i className="bi bi-cash-coin fs-1 text-warning"></i>
                <h5 className="mt-3">Affordable Prices</h5>
                <p>Get the best deals on travel bookings with us.</p>
              </div>

              <div className="why-box">
                <i className="bi bi-shield-check fs-1 text-success"></i>
                <h5 className="mt-3">Trusted Service</h5>
                <p>Secure and reliable bookings every time.</p>
              </div>

              <div className="why-box">
                <i className="bi bi-headset fs-1 text-primary"></i>
                <h5 className="mt-3">24/7 Support</h5>
                <p>We are here to help you anytime, anywhere.</p>
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          <section className="text-center mb-5">
            <h2 className="mb-4">What Our Customers Say</h2>
            <div className="horizontal-scroll">
              <div className="card review-card">
                <p className="fst-italic">"Booking tickets was super easy and fast!"</p>
                <p className="fw-bold">★★★★</p>
                <p>- Ramesh</p>
              </div>

              <div className="card review-card">
                <p className="fst-italic">"Great deals and very reliable service."</p>
                <p className="fw-bold">★★★★★</p>
                <p>- Priya</p>
              </div>

              <div className="card review-card">
                <p className="fst-italic">"I always book my trips here. Highly recommend!"</p>
                <p className="fw-bold">★★★★</p>
                <p>- Karthik</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default Home;
