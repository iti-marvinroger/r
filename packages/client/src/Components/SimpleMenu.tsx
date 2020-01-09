import React from "react";
import { storiesOf } from "@storybook/react";

import { Grommet, Box, Menu } from "grommet";
import { grommet } from "grommet/themes";

export const SimpleMenu = (items: any) => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
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
  </Grommet>
);

storiesOf("Menu", module).add("Simple", () => <SimpleMenu />);
