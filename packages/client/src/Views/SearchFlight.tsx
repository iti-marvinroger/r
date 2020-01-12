import React from "react";
import { SimpleMenu } from "../Components/SimpleMenu";
import { DateTimeDropButton } from "../Components/Datetimedropbutton";
import { SimpleCheckBox } from "../Components/SimpleCheckBox";
import { Grid, Form, Button, Box } from "grommet";

export class SearchFlight extends React.Component<
  {},
  { items: any; date: string }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      date: ""
    };

    this.handleDate = this.handleDate.bind(this);
  }

  handleDate = (newDate: string): void => {
    this.setState({ date: newDate });
    console.log(this.state.date);
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
        <SimpleMenu depart={true} items={items} />
        <SimpleMenu depart={false} items={items} />
        <DateTimeDropButton handleDate={this.handleDate} />
        <SimpleCheckBox label="1er Classe" toggle />
        <Box align="start" pad="large">
          <Form>
            <Button type="submit" primary label="+" />
          </Form>
        </Box>
      </Grid>
    );
  }
}
