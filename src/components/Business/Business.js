import React from "react";
import './Business.css';

class Business extends React.Component {
  
  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <img
            src={this.props.business.imageSrc}
            alt=""
          />
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <p><b>address:</b> {this.props.business.address}</p>
            <p><b>city:</b> {this.props.business.city}</p>
            <p><b>state:</b> {this.props.business.state} {this.props.business.zipcode}</p>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{this.props.business.rating} stars</h3>
            <p>{this.props.business.reviewCount} <b>reviews</b></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;