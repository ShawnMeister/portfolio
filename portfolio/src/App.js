import "./App.css";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Credits from "./Components/Credits";
import BlueSpheres from "./Components/BlueSpheres";
import WhiteSpheres from "./Components/WhiteSpheres";

import Axe from "./Components/Axe/Axe";

const App = props => {
  return (
    <div className="App">
      <Credits />
      <Canvas camera={{ position: [0, 0, 4] }}>
        {/* <oControls/> */}

        <WhiteSpheres />
        <BlueSpheres />

        <Suspense fallback={null}>
          {/* <PullRelease /> */}
          <Axe />
        </Suspense>

        {/* <Dodecahedron /> */}
      </Canvas>
    </div>
  );
};
export default App;
