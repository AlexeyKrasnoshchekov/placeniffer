import React from "react";
import "./SearchBar.css";





class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);


        this.sortByOptions = {
            BestMatch: "sort_by",
            HighestRated: "rating",
            MostReviewed: "review_count",
          };

        
    }

    getSortByClass(sortByOption) {
        return this.state.sortBy === sortByOption ? 'active' : '';
    }
  
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
        
    }

    handleTermChange(e) {
      this.setState({});
      this.setState({
        term: e.target.value
      });
    }
    handleLocationChange(e) {
      this.setState({});
      this.setState({
        location: e.target.value
      });
    }

    handleSearch(e) {
      e.preventDefault();
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }

    renderSortByOptions(){
        return Object.keys(this.sortByOptions).map((sortByOption) => {
          // console.log('222',sortByOption);
          let sortByOptionValue = this.sortByOptions[sortByOption];
          // console.log('333',sortByOptionValue);
          return <li className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
        });
    };


  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions(this.sortByOptions)}</ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch} href="#">Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
