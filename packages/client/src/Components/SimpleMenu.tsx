import React from "react";
import { storiesOf } from "@storybook/react";

import { Box, Menu } from "grommet";

export const SimpleMenu = (items: any) => (
  <Box align="start" pad="large">
    <Menu
      dropProps={{ align: { top: "bottom", left: "left" } }}
      label="actions"
      items={[
        { label: "JFK", onClick: () => {} },
        { label: "CDG", onClick: () => {} },
        { label: "DTW", onClick: () => {} }
      ]}
    />
  </Box>
);

storiesOf("Menu", module).add("Simple", () => <SimpleMenu />);
