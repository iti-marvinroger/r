import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, DataTable } from "grommet";

import { columns } from "../Data/data";

export class ClickableDataTable extends React.Component<
  { flights: any },
  { open: boolean; name: string; flight: any }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: true,
      name: "",
      flight: {}
    };
    this.OnclickOpen = this.OnclickOpen.bind(this);
    // this.OnClickPoutou = this.OnClickPoutou.bind(this);
  }

  OnclickOpen = (newOpen: boolean) => this.setState({ open: newOpen });

  render(): any {
    return (
      <Box align="center" pad="large">
        <DataTable
          columns={columns}
          data={this.props.flights}
          step={10}
          alignSelf="stretch"
        />
      </Box>
    );
  }
}

storiesOf("DataTable", module).add("Clickable", () => (
  <ClickableDataTable flights />
));
