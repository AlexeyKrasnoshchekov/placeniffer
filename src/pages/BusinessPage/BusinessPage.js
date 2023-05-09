import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import CarouselComponent from "../../components/Carousel/Carousel";
import "./BusinessPage.css";
import context from "../../context/context";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";

export default function BusinessPage() {
  let { id } = useParams();
  const { place, getPlace } = useContext(context);

  // const [business, setBusiness] = useState([]);
  // const [gurl, setGurl] = useState("");

  // const gapi = "AIzaSyAJlieS2MnisIz4mlnFFpvpqfwry-T6bmM";

  useEffect(() => {
    getPlace(id);
  }, []);

  // useEffect(() => {
  //   if (place) {
  //     if (place.location) {
  //       if (place.location.display_address.length !== 0) {
  //         const address = place.location.display_address.join();
  //         setGurl(
  //           `https://www.google.com/maps/embed/v1/place?key=${gapi}&q=${address}`
  //         );
  //       }
  //     }
  //   }
  // }, [place]);

  const routerHistory = useHistory();
  
  return (
    <div className="businesspage-container">
      <div className="businesspage-header">
        <button
          className="businesspage-back-button"
          onClick={routerHistory.goBack}
        >
          Back to list
        </button>
      </div>
      {place && (
        <div>
          <div>
            <h2 className="businesspage-heading">{place.name}</h2>
          </div>
          <div className="businesspage-cart">
            <div className="businesspage-cart-left">
              <CarouselComponent photos={place.photos} />
            </div>
            <div className="businesspage-cart-right">
              <div className="businesspage-rating-container">
                <div
                  style={{
                    display: "flex",
                    color: "green",
                    marginRight: "1rem",
                  }}
                >
                  <span>{place.rating}</span>
                  <span>
                    <AiFillStar />
                  </span>
                </div>
                <div>
                  {place.review_count > 1 ? (
                    <span>
                      {place.review_count} <b>reviews</b>
                    </span>
                  ) : (
                    <span>
                      {place.review_count} <b>review</b>
                    </span>
                  )}
                </div>
              </div>
              <div className="businesspage-devider"></div>
              {place.hours && <div
                className="businesspage-hours"
              >
                <span
                  style={{
                    marginRight: "0.5rem",
                    color: place.hours[0].is_open_now ? "green" : "red",
                  }}
                >
                  <AiOutlineClockCircle />
                </span>
                <span>{place.hours[0].is_open_now ? "Open" : "Closed"}</span>
              </div>}
              {place.price !== undefined && (
                <div className="businesspage-text">{`Price: ${place.price}`}</div>
              )}

              {place.categories && (
                <div className="businesspage-cats">
                  <span className="businesspage-text text-heading">
                    Categories:{"\u00A0"}
                  </span>
                  {place.categories.map((cat, index) =>
                    place.categories.length - 1 === index ? (
                      <span className="businesspage-text" key={index}>
                        {cat.title}
                      </span>
                    ) : (
                      <span
                        className="businesspage-text"
                        key={index}
                      >{`${cat.title} ,`}</span>
                    )
                  )}
                </div>
              )}

              <div className="businesspage-text">
                <div>
                  <span className="businesspage-text text-heading">
                    Phone:{"\u00A0"}
                  </span>
                  {place.phone}
                </div>
              </div>

              <div className="businesspage-text">
                {/* <div>{`Address: ${place.location.display_address.join()}`}</div> */}
                <div>
                  <span className="businesspage-text text-heading">
                    Address:{"\u00A0"}
                  </span>
                  {place.location.display_address.join(", ")}
                </div>
              </div>
              {/* <iframe
                title="map"
                width="100%"
                height="50%"
                frameBorder="0"
                src={gurl}
              ></iframe> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
