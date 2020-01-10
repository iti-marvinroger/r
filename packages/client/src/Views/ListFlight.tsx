import React from "react";
import { ClickableDataTable } from "../Components/ClickableDataTable ";

export class ListFlight extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <ClickableDataTable />
      </>
    );
  }
}
