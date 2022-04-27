import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import './Carousel.css';

class CarouselComponent extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       sortBy: "best_match",
  //     };
  //     this.businessTypeInput = createRef();
  //     this.businessLocationInput = createRef();

  //     this.handleSearch = this.handleSearch.bind(this);

  //     this.sortByOptions = {
  //       BestMatch: "best_match",
  //       HighestRated: "rating",
  //       MostReviewed: "review_count",
  //     };
  //   }
  render() {
      console.log('first', this.props.photos)
    return (
      <Carousel>
        {this.props.photos && this.props.photos.map((photo, index) => {
            return <div key={index} className="carousel-photo" style={{ backgroundImage: `url(${photo})` }} alt="main logo"></div>
        })}
      </Carousel>
    );
  }
}

export default CarouselComponent;
