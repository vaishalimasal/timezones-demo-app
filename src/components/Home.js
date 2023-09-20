import React, { useState } from "react";

function Home({ setUser }) {
  const [formData, setFormData] = useState({ name: "", timezone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
  };

  return (
    <div>
      <h1>Welcome to the Timezone App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <select
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
        >
          <option value="">Select Timezone</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
