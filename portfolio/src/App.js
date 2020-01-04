import React from 'react';
import './App.css';
import { Canvas } from "react-three-fiber";
//import Cubes from "./Components/Cubes";
//import Spheres from './Components/Spheres';
import TestSpheres from './Components/TestSpheres';





const App = props => {
  return (

    <div className="App">
   
    <Canvas>
      {/* <Spheres/> */}
      <TestSpheres/>
    </Canvas>

    </div>
  );
}

export default App;

