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
  CLEAR_PLACES,
} from "./reducer";

const State = (props) => {
  const initialState = {
    places: [],
    place: null,
    loading: false,
    term: "",
    location: "",
    sortBy: "best_match",
    error: "",
    page: 0,
    page_size: 12,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Get Messages
  const getPlaces = async () => {
    const offset = state.page * state.page_size;
    const url = `https://placeniffer.herokuapp.com/searchYelp/?term=${state.term}&location=${state.location}&sortby=${state.sortBy}&limit=${state.page_size}&offset=${offset}`;
    console.log('url', url)
    let response = await fetch(url, { mode: "cors" });

    let jsonResponse = await response.json();

    if (jsonResponse.error) {
      setError(jsonResponse.error.description);
    }

    if (jsonResponse.businesses) {
      if (jsonResponse.businesses.length !== 0) {
        jsonResponse.businesses.forEach((item) => {
          dispatch({
            type: SET_PLACES,
            payload: item,
          });
        });
      } else {
        setError("Nothing found");
      }
    }
  };

  // Get Message
  const getPlace = async (id) => {
    const url = `https://placeniffer.herokuapp.com/searchBusiness/?id=${id}`;

    let response = await fetch(url, { mode: "cors" });
    let jsonResponse = await response.json();
    dispatch({
      type: SET_PLACE,
      payload: jsonResponse,
    });
  };

  const setError = (str) => dispatch({ type: SET_ERROR, payload: str });
  const setTerm = (str) => {
    if (str === state.term) {
      return;
    } else {
      dispatch({ type: CLEAR_PLACES });
      dispatch({ type: SET_TERM, payload: str });
    }
  };

  const setLocation = (str) => {
    if (str === state.location) {
      return;
    } else {
      dispatch({ type: CLEAR_PLACES });
      dispatch({ type: SET_LOCATION, payload: str });
    }
  };
  const setSortBy = (str) => {
    if (str === state.sortBy) {
      return;
    } else {
      dispatch({ type: CLEAR_PLACES });
      dispatch({ type: SET_SORT_BY, payload: str });
    }
  };
  const setPage = (num) => dispatch({ type: SET_PAGE, payload: num });

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
        setPage,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
