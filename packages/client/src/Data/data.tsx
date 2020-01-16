import React from "react";
import { Box, Text, Meter } from "grommet";
import { BuyFlight } from "../Views/BuyFlight";

export const columns: any = [
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
    render: (flight: any) => <BuyFlight flight={flight} />
  }
];
