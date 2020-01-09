import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import React from "react";
import { Dashboard } from "./Views/Dashboard";

const App: React.FC = () => {
  return (
    <Grommet theme={grommet}>
      <Dashboard />
    </Grommet>
  );
};

export default App;
