import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import ClayCard from "@clayui/card";
import ClayButton from "@clayui/button";
import ClayDropDown from "@clayui/drop-down";
import { ClayCheckbox, ClaySelect } from "@clayui/form";
import "./Home.css";

function Home({ setUser, setCurrentTime }) {
  const [formData, setFormData] = useState({
    name: "",
    timezone: "",
    use24HourFormat: false,
    dateFormat: "MM/DD/YYYY",
    timeFormat: "HH:mm:ss",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setFormData(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "use24HourFormat") {
      setFormData({
        ...formData,
        use24HourFormat: !formData.use24HourFormat,
        timeFormat: formData.use24HourFormat ? "HH:mm:ss" : "hh:mm:ss a",
      });
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData({ ...formData, [name]: newValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);

    if (formData.timezone) {
      const format = formData.timeFormat;
      const currentTime = moment()
        .tz(formData.timezone)
        .format(`${formData.dateFormat} ${format}`);
      setCurrentTime(currentTime);

      const userData = { ...formData, currentTime };
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.setItem("user", JSON.stringify(formData));
    }
  };

  const [active, setActive] = useState(false);

  const menuItems = [
    {
      label: "Select Timezone",
      value: "",
    },
    {
      label: "India",
      value: "India",
    },
    {
      label: "London",
      value: "Europe/London",
    },
    {
      label: "Tokyo",
      value: "Asia/Tokyo",
    },
  ];

  const optionsDateFormat = [
    {
      label: "HH:mm:ss",
      value: "HH:mm:ss",
    },
    {
      label: "hh:mm:ss a",
      value: "hh:mm:ss a",
    },
  ];

  const optionsTimeFormat = [
    {
      label: "12-Hour Format",
      value: "hh:mm:ss a",
    },
    {
      label: "24-Hour Format",
      value: "HH:mm:ss",
    },
  ];

  const timezones = [
    "India",
    "Europe/London",
    "Asia/Tokyo",
    // Add more timezones here
  ];

  return (
    <div>
      <h1>Welcome to the Timezone App</h1>
      <div className="timezone-cards">
        {timezones.map((timezone) => (
          <ClayCard key={timezone} className="timezone-card">
            <ClayCard.Body>
              <h3>{timezone}</h3>
              <p>
                {moment()
                  .tz(timezone)
                  .format(`${formData.dateFormat} ${formData.timeFormat}`)}
              </p>
            </ClayCard.Body>
          </ClayCard>
        ))}
      </div>
      <ClayCard>
        <ClayCard.Body>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              <ClayDropDown
                active={active}
                onActiveChange={setActive}
                trigger={
                  <ClayButton btn-primary>{"Select Timezone"}</ClayButton>
                }
              >
                <ClayDropDown.ItemList>
                  {menuItems.map((item) => (
                    <ClayDropDown.Item
                      key={item.value}
                      onClick={() => {
                        setFormData({ ...formData, timezone: item.value });
                        setActive(false);
                      }}
                    >
                      {item.label}
                    </ClayDropDown.Item>
                  ))}
                </ClayDropDown.ItemList>
              </ClayDropDown>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="label-checkbox">
                  12/24hrs Hour Format:
                  <ClayCheckbox
                    checked={!formData.use24HourFormat}
                    name="use24HourFormat"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row select-row">
              <label>
                Date Format:
                <ClaySelect
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleChange}
                >
                  {optionsDateFormat.map((item) => (
                    <ClaySelect.Option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </ClaySelect>
              </label>
            </div>
            <div className="form-row">
              <label>
                Time Format:
                <ClaySelect
                  name="timeFormat"
                  value={formData.timeFormat}
                  onChange={handleChange}
                >
                  {optionsTimeFormat.map((item) => (
                    <ClaySelect.Option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </ClaySelect>
              </label>
            </div>
            <ClayButton type="submit" displayType="primary">
              Submit
            </ClayButton>
          </form>
        </ClayCard.Body>
      </ClayCard>
    </div>
  );
}

export default Home;
