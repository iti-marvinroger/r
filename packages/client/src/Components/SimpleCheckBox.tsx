import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { Box, Grommet, CheckBox } from "grommet";
import { grommet } from "grommet/themes";

export const SimpleCheckBox = (props: {
  handleFirstClass: any;
  label: string;
  toggle: boolean;
}) => {
  const [checked, setChecked] = useState(true);
  const onChange = () => setChecked(!checked);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <CheckBox
          label={props.label}
          toggle={props.toggle}
          checked={checked}
          onChange={() => {
            onChange();
            props.handleFirstClass();
          }}
        />
      </Box>
    </Grommet>
  );
};

storiesOf("CheckBox", module).add("Toggle", () => (
  <SimpleCheckBox handleFirstClass label="Choice" toggle />
));
