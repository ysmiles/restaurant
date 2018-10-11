import React from "react";
import { view as SampleModule } from "./samplemodule/";
import { view as OldApp } from "./oldapp/";
import { view as Login } from "./login/";

function App() {
  return (
    <div>
      <OldApp />
      <h1>-----------This is the line between 2 modules-----------</h1>
      <SampleModule />
      <h1>-----------This is the line between 2 modules-----------</h1>
      <Login />
    </div>
  );
}

export default App;
