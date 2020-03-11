import React, { Component } from "react";
import "../App.css";
import Moment from "react-moment";
import "moment-timezone";

export class TvListingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  attached() {}

  tvShowListing = () => {
    const tvShows = this.props.tvShows;
    const tvListingTemplate = tvShows.map(listing => (
      <React.Fragment key={listing.show.id.toString()}>
        <tr className="border-right border-left border-bottom">
          <td className="px-2"><a target="_blank" href={listing.show.url}>{listing.show.name}</a></td>
          <td>{this.formatStringArray(listing.show.genres)}</td>
          <td>{listing.show.rating.average}</td>
          <td>{listing.show.status}</td>
          <td>
            <Moment fromNow>{listing.show.premiered}</Moment>
          </td>
          <td>
            {this.formatStringArray(listing.show.schedule.days)} at{" "}
            {this.formatTimeValue(listing.show.schedule?.time)}
          </td>
          <td>{listing.show.network?.name}</td>
        </tr>
      </React.Fragment>
    ));

    return tvListingTemplate;
  };

  formatTimeValue(unformattedTime) {
    var time = unformattedTime; 

    time = time.split(":"); // convert to array

    var hours = Number(time[0]);
    var minutes = Number(time[1]);


    if(!minutes)
      minutes = '0'

    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
    timeValue += hours >= 12 ? " P.M." : " A.M.";

    return timeValue;
  }

  formatStringArray(array) {
    const commaDelminatedString = array.join(", ");
    return commaDelminatedString;
  }
  render() {
    return (
      <div>
        <table className="table table-striped custom-table-border">
          <thead>
            <tr>
              <th scope="col" className="border-left">
                Name
              </th>
              <th scope="col">Genre</th>
              <th scope="col">Rating</th>
              <th scope="col">Status</th>
              <th scope="col">Premiere Date</th>
              <th scope="col">Run Days</th>
              <th scope="col" className="border-right">
                Network
              </th>
            </tr>
          </thead>
          <tbody>{this.tvShowListing()}</tbody>
        </table>
      </div>
    );
  }
}

export default TvListingComponent;
