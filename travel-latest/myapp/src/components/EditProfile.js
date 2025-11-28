import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveChanges = () => {
    sessionStorage.setItem("user", JSON.stringify(user)); // Save updated user data
    navigate("/profile");
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
