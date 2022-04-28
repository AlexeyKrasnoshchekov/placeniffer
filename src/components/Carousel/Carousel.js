import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

class CarouselComponent extends Component {
  render() {
    return (
      <Carousel showThumbs={true} className="carousel-container">
        {this.props.photos &&
          this.props.photos.map((photo, index) => {
            return (
              <div
                key={index}
                className="carousel-photo"
                style={{ backgroundImage: `url(${photo})` }}
                alt="main logo"
              ></div>
            );
          })}
      </Carousel>
    );
  }
}

export default CarouselComponent;
