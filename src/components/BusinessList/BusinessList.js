import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business.js";

class BusinessList extends React.Component {
  render() {
    return (
      <div className="BusinessList">
        {this.props.places.map(place => {
            return <Business place={place} key={place.id}/>
        })}
      </div>
    );
  }
}

export default BusinessList;