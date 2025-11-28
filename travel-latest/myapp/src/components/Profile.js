import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in username from localStorage (from login page)
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:8080/api/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching user:", error));
  }, []);

  if (loading) {
    return <h2 className="loading-text">Loading Profile...</h2>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2 className="profile-title">My Profile</h2>

        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
