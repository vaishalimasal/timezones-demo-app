import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Home from "./Home";

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
        <Home setUser={setUser} setCurrentTime={setCurrentTime} />
      )}
    </div>
  );
}

export default Dashboard;
