import React, { useContext, useEffect, useRef } from "react";
import { createRef } from "react/cjs/react.production.min";
import "./SearchBar.css";
import context from "../../context/context";

export default function SearchBar() {
  // const [sortBy, setSortBy] = useState("best_match");
  const initialRender = useRef(true);
  const {
    sortBy,
    setSortBy,
    term,
    setTerm,
    location,
    setLocation,
    setError,
    getPlaces,
  } = useContext(context);

  let businessTypeInput = createRef();
  let businessLocationInput = createRef();

  let sortByOptions = {
    BestMatch: "best_match",
    HighestRated: "rating",
    MostReviewed: "review_count",
  };

  const getSortByClass = (sortByOption) => {
    return sortBy === sortByOption ? "active" : "";
  };
  const handleSortByChange = (e) => {
    setSortBy(e.target.dataset.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (businessTypeInput.current.value !== "" && businessLocationInput.current.value !== "") {
      setTerm(businessTypeInput.current.value);
      setLocation(businessLocationInput.current.value);
    } else {
      setError("Please type in search terms and try again");
    }
    
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    // if (term !== "" && location !== "") {
    //   getPlaces();
    // } else {
      
    // }
    getPlaces();
  }, [term, location, sortBy]);

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          className={getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          data-value={sortByOptionValue}
          onClick={handleSortByChange}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSearch}>
        <div className="SearchBar-sort-options">
          <ul>{renderSortByOptions(sortByOptions)}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            // onChange={handleTermChange}
            ref={businessTypeInput}
            // placeholder="Search Businesses"
            placeholder="Search Businesses"
          />
          <input
            // onChange={handleLocationChange}
            ref={businessLocationInput}
            placeholder="Where?"
          />
        </div>
        <div className="SearchBar-submit">
          <button type="submit" >Let's Go</button>
        </div>
      </form>
    </div>
  );
}
// class SearchBar extends React.Component {

//   // handleTermChange(e) {
//   //   setState({});
//   //   setState({
//   //     term: e.target.value,
//   //   });
//   // }
//   // handleLocationChange(e) {
//   //   setState({});
//   //   this.setState({
//   //     location: e.target.value,
//   //   });
//   // }

//   render() {
//     return (
//       <div className="SearchBar">
//         <div className="SearchBar-sort-options">
//           <ul>{this.renderSortByOptions(this.sortByOptions)}</ul>
//         </div>
//         <div className="SearchBar-fields">
//           <input
//             // onChange={this.handleTermChange}
//             ref={this.businessTypeInput}
//             placeholder="Search Businesses"
//           />
//           <input
//             // onChange={this.handleLocationChange}
//             ref={this.businessLocationInput}
//             placeholder="Where?"
//           />
//         </div>
//         <div className="SearchBar-submit">
//           <div onClick={this.handleSearch}>Let's Go</div>
//         </div>
//       </div>
//     );
//   }
// }
