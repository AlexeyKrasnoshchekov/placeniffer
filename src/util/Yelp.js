const apiID = process.env.REACT_APP_API_ID;
const apiKey = process.env.REACT_APP_API_KEY;
const cors = "https://cors-anywhere.herokuapp.com/";


// не работает, не получается передать результат запроса в APP.js
const Yelp = {
  search(term, location, sortBy) {
    const url = `${cors}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    console.log("url", url);
    return fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          console.log(
            "2222",
            jsonResponse.businesses.map((business) => {
              // console.log('business222', business);
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.image_url,
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
      });
  },
};

export default Yelp;
