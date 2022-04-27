import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import CarouselComponent from "../../components/Carousel/Carousel";
import "./BusinessPage.css";
import context from '../../context/context'

export default function BusinessPage() {
  let { id } = useParams();
  const { place, getPlace } = useContext(context);

  // const [business, setBusiness] = useState([]);
  const [gurl, setGurl] = useState("");

  const gapi = "AIzaSyAJlieS2MnisIz4mlnFFpvpqfwry-T6bmM";

  useEffect(() => {
    getPlace(id);
  }, []);

  useEffect(() => {
    if (place) {
      if (place.location) {
        if (place.location.display_address.length !== 0) {
          const address = place.location.display_address.join();
          setGurl(
            `https://www.google.com/maps/embed/v1/place?key=${gapi}&q=${address}`
          );
        }
      }
    }
  }, [place]);

  const routerHistory = useHistory();

  // const searchBusiness = async () => {
  //   const url = `http://localhost:5000/searchBusiness/?id=${id}`;

  //   let response = await fetch(url, { mode: "cors" });
  //   let jsonResponse = await response.json();
  //   console.log("jsonResponse", jsonResponse);
  //   setBusiness(jsonResponse);
  // };
  console.log('place', place)
  return (
    <div className="businesspage-container">
      <div className="businesspage-header">
        <div onClick={routerHistory.goBack}>Back</div>
      </div>
      {place && <div className="businesspage-cart">
        <div className="businesspage-heading">
          <div>{place.name}</div>
          <div>{place.price}</div>
        </div>
        <CarouselComponent photos={place.photos}/>
        <h2>Categories:</h2>
        {place.categories && (
          <ul className="businesspage-cats">
            {place.categories.map((cat) => {
              return <li key={cat.alias}>{cat.title}</li>;
            })}
          </ul>
        )}
        <div className="businesspage-rating-container">
          <div>{`Rating: ${place.rating}`}</div>
          <div>{`Number of Reviews: ${place.review_count}`}</div>
        </div>

        <iframe
          title="map"
          width="450"
          height="250"
          frameBorder="0"
          src={gurl}
        ></iframe>
        <div>
          <div>{`Phone: ${place.phone}`}</div>
        </div>
        
      </div>}
    </div>
  );
}
