import React, { useReducer } from "react";
import context from "./context";
import reducer from "./reducer";
import {
    SET_PLACE,
    SET_PLACES,
    SET_ERROR,
    SET_TERM,
    SET_LOCATION,
    SET_SORT_BY,
    SET_PAGE,
    CLEAR_PLACES
} from "./reducer";

const State = (props) => {
  const initialState = {
    places: [],
    place: null,
    loading: false,
    term: '',
    location: '',
    sortBy: 'best_match',
    error: '',
    page: 0,
    page_size: 12
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Get Messages
  const getPlaces = async () => {
    

    const offset = state.page * state.page_size;
    const url = `http://localhost:5000/searchYelp/?term=${state.term}&location=${state.location}&sortby=${state.sortBy}&limit=${state.page_size}&offset=${offset}`;

    let response = await fetch(url, { mode: "cors" });
    console.log('response', response)

    let jsonResponse = await response.json();
    console.log('response222', jsonResponse)

    if (jsonResponse.businesses) {
        if (jsonResponse.businesses.length !==0) {
            clearPlaces();
            jsonResponse.businesses.forEach((item) => {
                dispatch({
                  type: SET_PLACES,
                  payload: item,
                });
              });
        } else {
          setError('Nothing found');
        }
      }

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = "json";
    // xhr.open("GET", urlMails);

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState !== 4 || xhr.status !== 200) {
    //     return;
    //   }
    //   const response = xhr.response;
    //   response[0].forEach((item) => {
    //     dispatch({
    //       type: SET_PLACES,
    //       payload: item,
    //     });
    //   });

    // };

    // xhr.send();
  };

  // Get Message
  const getPlace = async (id) => {
    console.log("id", id);
    const url = `http://localhost:5000/searchBusiness/?id=${id}`;

    let response = await fetch(url, { mode: "cors" });
    let jsonResponse = await response.json();
    console.log("jsonResponse", jsonResponse);
    dispatch({
        type: SET_PLACE,
        payload: jsonResponse,
      });

    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", urlMailId);
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState !== 4 || xhr.status !== 200) {
    //     return;
    //   }
    //   const response = xhr.response;
    //   dispatch({
    //     type: SET_PLACE,
    //     payload: response,
    //   });
    // };
    // xhr.send();
  };

  
  const setError = (str) =>
    dispatch({ type: SET_ERROR, payload: str });
  const setTerm = (str) =>
    dispatch({ type: SET_TERM, payload: str });
  const setLocation = (str) =>
    dispatch({ type: SET_LOCATION, payload: str });
  const setSortBy = (str) =>
    dispatch({ type: SET_SORT_BY, payload: str });
  const setPage = (num) =>
    dispatch({ type: SET_PAGE, payload: num });
    const clearPlaces = () => dispatch({ type: CLEAR_PLACES });

  return (
    <context.Provider
      value={{
        places: state.places,
        place: state.place,
        error: state.error,
        term: state.term,
        location: state.location,
        sortBy: state.sortBy,
        page: state.page,
        page_size: state.page_size,
        getPlaces,
        getPlace,
        setError,
        setTerm,
        setLocation,
        setSortBy,
        setPage
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
