import React from "react";
import { SearchFlight } from "./SeachFlight";
import { ListFlight } from "./ListFlight";

export class Dashboard extends React.Component {
  render() {
    return (
      <>
        <SearchFlight />
        <br />
        <ListFlight />
      </>
    );
  }
}
