export const SET_PLACE = "SET_PLACE";
export const SET_PLACES = "SET_PLACES";
export const SET_ERROR = "SET_ERROR";
export const SET_TERM = "SET_TERM";
export const SET_LOCATION = "SET_LOCATION";
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_PAGE = "SET_PAGE";
export const CLEAR_PLACES = "CLEAR_PLACES";
  
  export default (state, action) => {
    switch (action.type) {
      case SET_PLACES:
        return {
          ...state,
          places: [...state.places, action.payload],
          loading: false,
        };
  
      case SET_PLACE:
        return {
          ...state,
          place: action.payload,
        };
      case SET_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case SET_TERM:
        return {
          ...state,
          term: action.payload,
        };
      case SET_LOCATION:
        return {
          ...state,
          location: action.payload,
        };
      case SET_SORT_BY:
        return {
          ...state,
          sortBy: action.payload,
        };
      case SET_PAGE:
        return {
          ...state,
          page: action.payload,
        };
        case CLEAR_PLACES: {
            return {
              ...state,
              places: [],
            };
          }
  
    }
  };
  