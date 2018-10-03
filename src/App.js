import React from "react";
import { view as SampleModule } from "./samplemodule/";
import { view as OldApp } from "./oldapp/";

function App() {
  return (
    <div>
      <OldApp />
      <h1>-----------This is the line between 2 modules-----------</h1>
      <SampleModule />
    </div>
  );
}

export default App;
