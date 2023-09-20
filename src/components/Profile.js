import React from "react";
import ClayCard from "@clayui/card";
import ClayButton from "@clayui/button";

function Profile({ user, handleLogout, currentTime }) {
  return (
    <div>
      <ClayCard>
        <ClayCard.Body>
          <h1>Welcome, {user.name}!</h1>
          <p>Your Timezone: {user.timezone}</p>
          {currentTime && <p>Current Time in Your Timezone: {currentTime}</p>}
          <ClayButton onClick={handleLogout} displayType="primary">
            Logout
          </ClayButton>
        </ClayCard.Body>
      </ClayCard>
    </div>
  );
}

export default Profile;
