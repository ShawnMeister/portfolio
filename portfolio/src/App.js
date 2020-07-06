import "./App.css";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Credits from "./Components/Credits";
import BlueSpheres from "./Components/BlueSpheres";
import WhiteSpheres from "./Components/WhiteSpheres";
import Environment from "./Components/Environment";
import Lights from "./Components/Lights";
import Animations from "./Components/Animations/Animations";

const App = (props) => {
  return (
    <div className="App">
      <Credits />
      <Canvas camera={{ position: [0, 0, 4] }}>
        {/* <oControls/> */}

        <WhiteSpheres />
        <BlueSpheres />
        <Lights />

        <Environment />

        <Suspense fallback={null}>
          {/* <PullRelease /> */}
          <Animations />
        </Suspense>

        {/* <Dodecahedron /> */}
      </Canvas>
    </div>
  );
};
export default App;
