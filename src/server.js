const express = require("express");
const cors = require("cors");
require("dotenv").config();
var fetch = require("node-fetch-commonjs");
const app = express();

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;
const apiKey = process.env.REACT_APP_API_KEY;

app.use(cors());
const corsOptions = {
  origin: ORIGIN,
};

app.get("/searchYelp", cors(corsOptions), async (req, res) => {
  let term = req.query.term;
  let location = req.query.location;
  let sortBy = req.query.sortby;
  let limit = req.query.limit;
  let offset = req.query.offset;

  const requestEndpoint = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&limit=${limit}&offset=${offset}`;

  const response = await fetch(requestEndpoint, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const jsonResponse = await response.json();
  res.json(jsonResponse);

  // console.log('response', response);
  // if (response.ok) {
  //   const jsonResponse = await response.json();
  //   res.json(jsonResponse);
  // } else {
  //   res.json('Something went wrong');
  //   // res.json(jsonResponse);
  // }
  
});

app.get("/searchBusiness", cors(corsOptions), async (req, res) => {
  let id = req.query.id;
  console.log('id', id);
  const requestEndpoint = `https://api.yelp.com/v3/businesses/${id}`;

  const response = await fetch(requestEndpoint, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const jsonResponse = await response.json();
  console.log('first', jsonResponse);
  res.json(jsonResponse);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
