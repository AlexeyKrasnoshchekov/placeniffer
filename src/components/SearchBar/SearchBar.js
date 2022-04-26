import React from "react";
import { createRef } from "react/cjs/react.production.min";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "best_match",
    };
    this.businessTypeInput = createRef();
    this.businessLocationInput = createRef();

    this.handleSearch = this.handleSearch.bind(this);

    this.sortByOptions = {
      BestMatch: "best_match",
      HighestRated: "rating",
      MostReviewed: "review_count",
    };
  }

  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? "active" : "";
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption,
    });
    // this.props.setSortBy(this.state.sortBy);
  }

  // handleTermChange(e) {
  //   this.setState({});
  //   this.setState({
  //     term: e.target.value,
  //   });
  // }
  // handleLocationChange(e) {
  //   this.setState({});
  //   this.setState({
  //     location: e.target.value,
  //   });
  // }
  

  handleSearch(e) {
    e.preventDefault();
    this.props.setTerm(this.businessTypeInput.current.value);
    this.props.setLocation(this.businessLocationInput.current.value);
    this.props.setSortBy(this.state.sortBy);

    // this.props.searchYelp(
    //   this.state.term,
    //   this.state.location,
    //   this.state.sortBy
    // );
  }

  // рендерит панель вариантов фильтра, при нажатии на вариант он запишется в state, выбранному варианту назначится класс для оформления
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions(this.sortByOptions)}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            // onChange={this.handleTermChange}
            ref={this.businessTypeInput}
            placeholder="Search Businesses"
          />
          <input 
            // onChange={this.handleLocationChange} 
            ref={this.businessLocationInput}
            placeholder="Where?" 
          />
        </div>
        <div className="SearchBar-submit">
          <div onClick={this.handleSearch}>Let's Go</div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
