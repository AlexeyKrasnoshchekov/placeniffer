import React from "react";
import "./Business.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Business({ place }) {
  return (
    <div className="business">
      <div className="image-container">
        <img src={place.image_url} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link className="business-name" to={`/placeniffer/business/${place.id}`}>
          <h2>{place.name}</h2>
        </Link>
        <div style={{ display: "flex", color: "green" }}>
          <span>{place.rating}</span>
          <span>
            <AiFillStar />
          </span>
        </div>
      </div>
      <div className="business-information">
        <div className="business-information-top">
          {place.review_count > 1 ? (
            <span>
              {place.review_count} <b>reviews</b>
            </span>
          ) : (
            <span>
              {place.review_count} <b>review</b>
            </span>
          )}
          <span style={{ color: "green" }}>{place.price}</span>
        </div>
        <div className="business-address">
          <p>
            <b>category:</b>{" "}
            {place.categories.map((cat, index) =>
              place.categories.length - 1 === index ? (
                <span key={index}>{cat.title}</span>
              ) : (
                <span key={index}>{`${cat.title}, `}</span>
              )
            )}
          </p>
          <p>
            <b>address:</b> {place.location.display_address[0]}
          </p>
          <p>
            <b>city:</b> {place.location.display_address[1]}
          </p>
          <p>
            <b>state:</b> {place.location.display_address[2]}
          </p>
        </div>
      </div>
    </div>
  );
}
