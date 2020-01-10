import React from "react";
import { SimpleMenu } from "../Components/SimpleMenu";
import { DateTimeDropButton } from "../Components/Datetimedropbutton";
import { SimpleCheckBox } from "../Components/SimpleCheckBox";
import { Grid, Form, Button, Box } from "grommet";

export class SearchFlight extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [
        { label: "JFK", onClick: () => {} },
        { label: "CDG", onClick: () => {} },
        { label: "DTW", onClick: () => {} }
      ]
    };
  }
  render() {
    // const { items } = this.state; // *TODO*

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
        <SimpleMenu depart={true} /> {/*TODO items={items} */}
        <SimpleMenu depart={false} /> {/*TODO items={items} */}
        <DateTimeDropButton />
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
