import React from "react";
import { storiesOf } from "@storybook/react";

import { Box, Menu } from "grommet";

export const SimpleMenu = (props: { depart: boolean; items: any }) => (
  <Box align="start" pad="large">
    <Menu
      dropProps={{ align: { top: "bottom", left: "left" } }}
      label={props.depart === true ? "depart" : "arriver"}
      items={props.items}
    />
  </Box>
);

storiesOf("Menu", module).add("Simple", () => <SimpleMenu depart items />);
