import React from "react";
import { storiesOf } from "@storybook/react";

import { Box, Menu } from "grommet";

export const SimpleMenu = (props: { depart: boolean } /* TODO items: []*/) => (
  <Box align="start" pad="large">
    <Menu
      dropProps={{ align: { top: "bottom", left: "left" } }}
      label={props.depart === true ? "depart" : "arriver"}
      items={[
        { label: "JFK", onClick: () => {} },
        { label: "CDG", onClick: () => {} },
        { label: "DTW", onClick: () => {} }
      ]}
    />
  </Box>
);

storiesOf("Menu", module).add("Simple", () => (
  <SimpleMenu depart />
)); /* TODO items */
