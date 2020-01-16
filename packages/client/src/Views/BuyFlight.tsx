import React from "react";
import { storiesOf } from "@storybook/react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Add, Close } from "grommet-icons";

import { Box, Button, FormField, Heading, Layer, TextInput } from "grommet";

export const BuyFlight: any = (props: { flight: any }) => {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const onOpen: any = () => setOpen(true);
  const onClose: any = () => setOpen(false);
  const onNamed: any = () => setName(name);
  const buyFlightService: any = (flight: any, name: string) => {
    flight.name = name;
    console.log(props.flight, name);
    fetch(`http://localhost:3004/DATA`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: flight
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return (
    <>
      <Box fill align="center" justify="center">
        <Button
          icon={<Add />}
          label="Acheter"
          onClick={onOpen}
          disabled={disabled}
        />
        {open && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={onClose}
            onEsc={onClose}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={onClose}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={2} margin="none">
                  Information personnelle
                </Heading>
                <Button icon={<Close />} onClick={onClose} />
              </Box>
              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                <FormField label="Nom">
                  <TextInput
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </FormField>
              </Box>
              <Box flex={false} as="footer" align="start">
                <Button
                  type="submit"
                  label="Submit"
                  onClick={() => {
                    onNamed(name);
                    buyFlightService(props.flight, name);
                    setDisabled(!disabled);
                    onClose();
                  }}
                  primary
                />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    </>
  );
};

storiesOf("Layer", module).add("Form", () => <BuyFlight flight />);
