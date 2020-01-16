import React, { useMemo } from "react";
import { storiesOf } from "@storybook/react";

import { Box, Menu } from "grommet";

export const SimpleMenu: any = function(props: {
  depart: boolean;
  items: any;
  handleAirport: any;
}) {
  const airports: [] = useMemo(() => {
    return props.items.map((item: any) => {
      const airport: any = {
        label: item.label,
        onClick: () => props.handleAirport(item.label, props.depart)
      };
      return airport;
    });
  }, [props]);

  return (
    <Box align="start" pad="large">
      <Menu
        dropProps={{ align: { top: "bottom", left: "left" } }}
        label={props.depart === true ? "depart" : "arriver"}
        items={airports}
      />
    </Box>
  );
};

storiesOf("Menu", module).add("Simple", () => (
  <SimpleMenu depart items handleAirport />
));
