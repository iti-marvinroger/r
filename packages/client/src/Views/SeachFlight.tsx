import React from "react";
import { SimpleMenu } from "../Components/SimpleMenu";
import { DateTimeDropButton } from "../Components/Datetimedropbutton";

const items = [
  { label: "JFK", onClick: () => {} },
  { label: "CDG", onClick: () => {} },
  { label: "DTW", onClick: () => {} }
];

export class SearchFlight extends React.Component {
  render() {
    return (
      <>
        <>
          <SimpleMenu />
          <DateTimeDropButton />
        </>
        <br />
        <>
          <SimpleMenu />
          <DateTimeDropButton />
        </>
      </>
    );
  }
}
