import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Button, Text, Calendar, DropButton } from "grommet";
import { Schedule } from "grommet-icons";

interface IDropContent {
  date: string;
  onClose: any;
  handleDate: any;
}
const DropContent: any = ({
  date: initialDate,
  onClose,
  handleDate
}: //
IDropContent) => {
  const [date, setDate] = React.useState();

  const close: any = () => {
    onClose(date || initialDate);
    handleDate(date);
  };

  return (
    <Box align="center">
      <Calendar
        animate={false}
        date={date || initialDate}
        onSelect={setDate}
        showAdjacentDays={false}
      />
      <Box flex={false} pad="medium" gap="medium">
        <Box flex={false}>
          <Button label="Done" onClick={close} />
        </Box>
      </Box>
    </Box>
  );
};

export class DateTimeDropButton extends React.Component<
  { handleDate: any },
  { date: string; open: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      date: "",
      open: false
    };

    this.onClose = this.onClose.bind(this);
  }

  onClose: any = (nextDate: string) => {
    this.setState({ date: nextDate });
    this.setState({ open: false });
    setTimeout(() => this.setState({ open: undefined }), 1);
  };

  render(): any {
    const { date, open } = this.state;
    const { handleDate } = this.props;

    return (
      <Box align="start" pad="large">
        <DropButton
          open={open}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          dropContent={
            <DropContent
              date={date}
              onClose={this.onClose}
              handleDate={handleDate}
            ></DropContent>
          }
        >
          <Box direction="row" gap="medium" align="center" pad="small">
            <Text color={date ? undefined : "dark-5"}>
              {date
                ? `${new Date(date).toLocaleDateString()}`
                : " date & heure"}
            </Text>
            <Schedule />
          </Box>
        </DropButton>
      </Box>
    );
  }
}

storiesOf("MaskedInput", module).add("Date Time Drop", () => (
  <DateTimeDropButton handleDate />
));
