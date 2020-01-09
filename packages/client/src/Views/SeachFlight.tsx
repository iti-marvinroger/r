import React from "react";
import { SimpleMenu } from "../Components/SimpleMenu";
import { DateTimeDropButton } from "../Components/Datetimedropbutton";
import { Grid, Form, Button, Box } from "grommet";

export class SearchFlight extends React.Component {
  render() {
    return (
      <>
        <Grid
          rows={["small"]}
          columns={["small", "auto", "small"]}
          gap="small"
          areas={[
            { name: "airport", start: [0, 0], end: [0, 0] },
            { name: "date", start: [1, 0], end: [1, 0] },
            { name: "submit", start: [2, 0], end: [2, 0] }
          ]}
        >
          <SimpleMenu />
          <DateTimeDropButton />
          <Box align="start" pad="large">
            <Form>
              <Button type="submit" primary label="+" />
            </Form>
          </Box>
        </Grid>
        <br />
        <Grid
          rows={["small"]}
          columns={["small", "auto", "small"]}
          gap="small"
          areas={[
            { name: "airport", start: [0, 0], end: [0, 0] },
            { name: "date", start: [1, 0], end: [1, 0] },
            { name: "submit", start: [2, 0], end: [2, 0] }
          ]}
        >
          <SimpleMenu />
          <DateTimeDropButton />
          <Box align="start" pad="large">
            <Form>
              <Button type="submit" primary label="+" />
            </Form>
          </Box>
        </Grid>
      </>
    );
  }
}
