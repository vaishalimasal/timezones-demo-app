import React from "react";

function Profile({ user, handleLogout, currentTime }) {
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your Timezone: {user.timezone}</p>
      {currentTime && <p>Current Time in Your Timezone: {currentTime}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
