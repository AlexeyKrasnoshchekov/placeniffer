// import logo from './logo.svg';
import React, { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import BusinessList from "../BusinessList/BusinessList.js";
// import Yelp from "../../util/Yelp.js";
const apiKey = process.env.REACT_APP_API_KEY;
const cors = "https://cors-anywhere.herokuapp.com/";

function App() {
  const [businessesState, setBusinesses] = useState([]);

  const searchYelp = async (term, location, sortBy) => {
    const url = `${cors}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    console.log("url", url);

    let response = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    let jsonResponse = await response.json();

    if (jsonResponse.businesses) {
      await setBusinesses(
        jsonResponse.businesses.map((business) => {
          // console.log('business222', business);
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          };
        })
      );
    } else {
      return [
        "imageSrc",
        "name",
        "address",
        "city",
        "state",
        "zipCode",
        "category",
        "rating",
        "reviewCount",
      ];
    }
    console.log('businessesState', businessesState);
  };  

  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={searchYelp} />
      <BusinessList businesses={businessesState} />
    </div>
  );
}

export default App;
