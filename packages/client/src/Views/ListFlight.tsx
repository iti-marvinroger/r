import React from "react";
import { ClickableDataTable } from "../Components/ClickableDataTable ";

export class ListFlight extends React.Component<{ flights: any }, {}> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render(): any {
    return (
      <>
        <ClickableDataTable flights={this.props.flights} />
      </>
    );
  }
}
