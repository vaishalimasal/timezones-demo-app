import React from "react";
import moment from "moment-timezone";
import ClayCard from "@clayui/card";

function TimezoneCards({ selectedTimezone, timezones, formData }) {
  return (
    <div className="timezone-cards">
      {selectedTimezone && (
        <ClayCard className="timezone-card">
          <ClayCard.Body>
            <h3>My Current Timezone</h3>
            <p>
              {moment()
                .tz(selectedTimezone)
                .format(`${formData.dateFormat} ${formData.timeFormat}`)}
            </p>
          </ClayCard.Body>
        </ClayCard>
      )}

      {timezones.map((timezone) => (
        <ClayCard
          key={timezone}
          className={`timezone-card ${
            selectedTimezone === timezone ? "selected" : ""
          }`}
        >
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
  );
}

export default TimezoneCards;
