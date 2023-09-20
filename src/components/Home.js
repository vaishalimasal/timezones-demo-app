import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

function Home({ setUser, setCurrentTime }) {
  const [formData, setFormData] = useState({
    name: "",
    timezone: "",
    use24HourFormat: false, // New state for 24-hour format
    dateFormat: "MM/DD/YYYY", // New state for date format
    timeFormat: "HH:mm:ss", // New state for time format
  });

  useEffect(() => {
    // Check if user preferences are stored in localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setFormData(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? !formData.use24HourFormat : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);

    // Calculate the current time for the selected timezone
    if (formData.timezone) {
      let format = formData.timeFormat;
      if (!formData.use24HourFormat) {
        format = format
          .replace("HH", "hh")
          .replace("mm", "mm")
          .replace("ss", "a");
      }
      const currentTime = moment()
        .tz(formData.timezone)
        .format(`${formData.dateFormat} ${format}`);
      setCurrentTime(currentTime);

      // Store both selected timezone and current time in localStorage
      const userData = { ...formData, currentTime };
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // If no timezone is selected, only store the selected timezone in localStorage
      localStorage.setItem("user", JSON.stringify(formData));
    }
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
          <option value="India">India</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
        <div>
          <label>
            12-Hour Format:
            <input
              type="checkbox"
              name="use24HourFormat"
              checked={!formData.use24HourFormat} // Toggle the value
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Date Format:
            <select
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleChange}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Time Format:
            <select
              name="timeFormat"
              value={formData.timeFormat}
              onChange={handleChange}
            >
              <option value="HH:mm:ss">HH:mm:ss</option>
              <option value="hh:mm:ss a">hh:mm:ss a</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
