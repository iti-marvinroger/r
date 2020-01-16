import React from "react";
import { SearchFlight } from "./SearchFlight";
import { ListFlight } from "./ListFlight";

export class Dashboard extends React.Component<{}, { flights: any }> {
  constructor(props: any) {
    super(props);

    this.state = { flights: [] };

    this.handleFlight = this.handleFlight.bind(this);
  }

  handleFlight = (newFlights: any) => {
    this.setState({ flights: newFlights });
  };

  render(): any {
    return (
      <>
        <SearchFlight handleFlight={this.handleFlight} />
        <br />
        <ListFlight flights={this.state.flights} />
      </>
    );
  }
}
