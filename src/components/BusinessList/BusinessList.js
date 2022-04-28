import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business.js";

function BusinessList({places}) {
  return (
    <div className="BusinessList">
      {places.map((place) => {
        return <Business place={place} key={place.id} />;
      })}
    </div>
  );
}

export default BusinessList;
