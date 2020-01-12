import React from "react";
import { SearchFlight } from "./SearchFlight";
import { ListFlight } from "./ListFlight";

export class Dashboard extends React.Component {
  render(): any {
    return (
      <>
        <SearchFlight />
        <br />
        <ListFlight />
      </>
    );
  }
}
