import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { SimpleMenu } from "../Components/SimpleMenu";
import { DateTimeDropButton } from "../Components/Datetimedropbutton";
import { SimpleCheckBox } from "../Components/SimpleCheckBox";
import { Grid, Form, Button, Box } from "grommet";

export class SearchFlight extends React.Component<
  { handleFlight: any },
  {
    items: any;
    date: string;
    depart: string;
    arriver: any;
    isFirstClass: boolean;
    flights: any;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      date: "",
      depart: "",
      arriver: "",
      isFirstClass: false,
      flights: []
    };

    this.handleDate = this.handleDate.bind(this);
    this.handleAirport = this.handleAirport.bind(this);
    this.handleFirstClass = this.handleFirstClass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDate = (newDate: string): void => {
    newDate = newDate.split("T")[0];
    this.setState({ date: newDate });
  };

  handleAirport = (airport: string, depart: boolean): void => {
    depart
      ? this.setState({ depart: airport })
      : this.setState({ arriver: airport });
  };

  handleFirstClass = (): void => {
    this.setState({ isFirstClass: !this.state.isFirstClass });
  };

  handleSubmit = (): void => {
    const url: string = `http://localhost:3004/DATA?departLocation=${encodeURIComponent(
      this.state.depart
    )}&arriverLocation=${encodeURIComponent(
      this.state.arriver
    )}&departHour=${encodeURIComponent(this.state.date)}`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.props.handleFlight(json);
        this.setState({ depart: "" });
        this.setState({ arriver: "" });
        this.setState({ date: "" });
        this.setState({ isFirstClass: false });
      });
  };

  componentDidMount(): void {
    fetch("http://localhost:3004/items", {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => this.setState({ items: json }));
  }

  render(): any {
    const { items } = this.state;

    return (
      <Grid
        rows={["xsmall"]}
        columns={["small", "small", "auto", "auto", "auto"]}
        gap="small"
        areas={[
          { name: "airport", start: [0, 0], end: [0, 0] },
          { name: "date", start: [1, 0], end: [1, 0] },
          { name: "firstclass", start: [2, 0], end: [2, 0] },
          { name: "submit", start: [3, 0], end: [3, 0] }
        ]}
      >
        <SimpleMenu
          depart={true}
          items={items}
          handleAirport={this.handleAirport}
        />
        <SimpleMenu
          depart={false}
          items={items}
          handleAirport={this.handleAirport}
        />
        <DateTimeDropButton handleDate={this.handleDate} />
        <SimpleCheckBox
          handleFirstClass={this.handleFirstClass}
          label="1er Classe"
          toggle
        />
        <Box align="start" pad="large">
          <Form>
            <Button
              type="submit"
              primary
              label="+"
              onClick={() => this.handleSubmit()}
            />
          </Form>
        </Box>
      </Grid>
    );
  }
}
