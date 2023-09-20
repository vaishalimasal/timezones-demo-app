import React from "react";

function Profile({ user, handleLogout }) {
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your Timezone: {user.timezone}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
