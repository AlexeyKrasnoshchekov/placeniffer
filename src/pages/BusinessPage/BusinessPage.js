import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./BusinessPage.css";

export default function BusinessPage() {
  let { id } = useParams();

  const [business, setBusiness] = useState([]);
  const [gurl, setGurl] = useState("");

  const gapi = "AIzaSyAJlieS2MnisIz4mlnFFpvpqfwry-T6bmM";

  useEffect(() => {
    searchBusiness();
  }, []);
  useEffect(() => {
    if (business) {
      if (business.location) {
        if (business.location.display_address.length !== 0) {
          const address = business.location.display_address.join();
          setGurl(
            `https://www.google.com/maps/embed/v1/place?key=${gapi}&q=${address}`
          );
        }
      }
    }
  }, [business]);

  const routerHistory = useHistory();

  const searchBusiness = async () => {
    const url = `http://localhost:5000/searchBusiness/?id=${id}`;

    let response = await fetch(url, { mode: "cors" });
    let jsonResponse = await response.json();
    console.log("jsonResponse", jsonResponse);
    setBusiness(jsonResponse);
  };

  return (
    <div className="businesspage-container">
      <div className="businesspage-header">
        <div onClick={routerHistory.goBack}>Back</div>
      </div>
      <div className="businesspage-cart">
        <div className="businesspage-heading">
          <div>{business.name}</div>
          <div>{business.price}</div>
        </div>
        <h2>Categories:</h2>
        {business.categories && (
          <ul className="businesspage-cats">
            {business.categories.map((cat) => {
              return <li key={cat.alias}>{cat.title}</li>;
            })}
          </ul>
        )}
        <div className="businesspage-rating-container">
          <div>{`Rating: ${business.rating}`}</div>
          <div>{`Number of Reviews: ${business.review_count}`}</div>
        </div>

        {/* Google Map */}
        <iframe
          title="map"
          width="450"
          height="250"
          frameBorder="0"
          src={gurl}
        ></iframe>
        <div>
          <div>{`Phone: ${business.phone}`}</div>
        </div>
      </div>
    </div>
  );
}
