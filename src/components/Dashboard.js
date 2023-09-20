import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Home from "./Home/Home";
import ClayCard from "@clayui/card";
import ClayButton from "@clayui/button";

function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    timezone: "",
  });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ name: "", timezone: "" });
  };

  return (
    <div className="App">
      {user.name ? (
        <Profile
          user={user}
          handleLogout={handleLogout}
          currentTime={currentTime}
        />
      ) : (
        <ClayCard>
          <ClayCard.Body>
            <Home setUser={setUser} setCurrentTime={setCurrentTime} />
          </ClayCard.Body>
        </ClayCard>
      )}
    </div>
  );
}

export default Dashboard;
