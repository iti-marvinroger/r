import React from "react";
import { storiesOf } from "@storybook/react";

import { Add, Close } from "grommet-icons";

import { Box, Button, FormField, Heading, Layer, TextInput } from "grommet";

export const FormLayer: any = () => {
  const [open, setOpen] = React.useState(false);

  const onOpen: any = () => setOpen(true);

  const onClose: any = () => setOpen(false);

  return (
    <>
      <Box fill align="center" justify="center">
        <Button icon={<Add />} label="Acheter" onClick={onOpen} />
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
                  <TextInput />
                </FormField>
                <FormField label="Prenom">
                  <TextInput />
                </FormField>
                <FormField label="Email">
                  <TextInput />
                </FormField>
              </Box>
              <Box flex={false} as="footer" align="start">
                <Button
                  type="submit"
                  label="Submit"
                  onClick={onClose}
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

storiesOf("Layer", module).add("Form", () => <FormLayer />);
