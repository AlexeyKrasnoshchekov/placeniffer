import React from "react";
import "./Business.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

class Business extends React.Component {
  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <img src={this.props.place.image_url} alt="" />
        </div>
        <Link to={`/business/${this.props.place.id}`}>
          <h2>{this.props.place.name}</h2>
        </Link>
        <div className="Business-information">
          <div className="Business-information-top">
            <div style={{ display: "flex", color: "green" }}>
              <span>{this.props.place.rating}</span>
              <span>
                <AiFillStar />
              </span>
            </div>
            <span>
              {this.props.place.review_count} <b>reviews</b>
            </span>
          </div>
          <div className="Business-address">
            <p>
              <b>category:</b> {this.props.place.category}
            </p>
            <p>
              <b>address:</b> {this.props.place.address}
            </p>
            <p>
              <b>city:</b> {this.props.place.city}
            </p>
            <p>
              <b>state:</b> {this.props.place.state}{" "}
              {this.props.place.zipcode}
            </p>
          </div>
          {/* <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{this.props.business.rating} stars</h3>
            <p>
              {this.props.business.reviewCount} <b>reviews</b>
            </p>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Business;
