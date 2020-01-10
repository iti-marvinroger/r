import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, DataTable, Text, Meter } from "grommet";
import { FormLayer } from "./FormLayer";

import { DATA } from "../Data/data";

const columns = [
  {
    property: "NumVols",
    header: <Text>NumVols</Text>,
    primary: true
  },

  {
    property: "departLocation",
    header: <Text>Départ</Text>
  },
  {
    property: "departHour",
    header: <Text>Heure départ</Text>
  },
  {
    property: "arriverLocation",
    header: <Text>Arriver</Text>
  },
  {
    property: "ArriverHour",
    header: <Text>Heure arriver</Text>
  },
  {
    property: "percent",
    header: "Remplissage",
    render: (datum: any) => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[{ value: datum.percent }]}
          thickness="small"
          size="small"
        />
      </Box>
    )
  },
  {
    property: "prix",
    header: <Text>Prix</Text>
  },
  {
    property: "show",
    header: <Text>Show</Text>,
    render: () => <FormLayer />
  }
];

export const ClickableDataTable = () => (
  <Box align="center" pad="large">
    {}
    <DataTable columns={columns} data={DATA} step={10} alignSelf="stretch" />
  </Box>
);

storiesOf("DataTable", module).add("Clickable", () => <ClickableDataTable />);
