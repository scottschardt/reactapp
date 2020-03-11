import React from "react";
import "../App.css";
import { TvListingComponent } from "./tvListingComponent";

class TvInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      listingLoaded: false,
      loading: false,
      tvShows: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    this.getTvListing(this.state.searchInput);
    console.log(this.state);
  };

  handleInputChange = event => {
    event.preventDefault();
    let searchInput = event.target.value;

    this.setState({
      searchInput: searchInput
    });
  };

  getTvListing(query) {
    fetch("http://api.tvmaze.com/search/shows?q=" + query)
      .then(res => res.json())
      .then(json => {
        this.setState({
          listingLoaded: true,
          tvShows: json,
          loading: false
        });
      });
  }

  displayShowListing = () => {
    if (this.state.listingLoaded && this.state.tvShows.length)
      return <TvListingComponent tvShows={this.state.tvShows} />;
  };

  displayLoading = () => {
    if(this.state.loading)
      return <div>Loading...</div>
  }
  render() {
    const { searchInput, listingLoaded, tvShows } = this.state;
    return (
      <div className="App">
        <header className="mt-2">
          <div className="m-4">
                 <div className="row no-gutters">
                    <label className="mb-1 font-weight-bold">
                        Search Tv Listings
                    </label>
                   </div> 
            <div className="row no-gutters">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="searchInput"
                    onChange={this.handleInputChange}
                    placeholder="i.e. 'Shark Tank'"

                  ></input>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div>{this.displayLoading()}</div>
            <div>{this.displayShowListing()}</div>
          </div>
        </header>
      </div>
    );
  }
}

export default TvInputComponent;
