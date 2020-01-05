import React from 'react';
import './App.css';
import { Canvas } from "react-three-fiber";
import Credits from './Components/Credits';
import BlueSpheres from './Components/BlueSpheres';
import WhiteSpheres from './Components/WhiteSpheres';
import TestSpheres from './Components/TestSpheres';
import Lights from './Components/Lights';
import Environment from './Components/Environment';
import { Raycaster } from 'three';
import { Vector2 } from 'three';
import { Scene } from 'three';





const App = props => {



  return (

    <div className="App">
      <Credits />
      <Canvas>

        <WhiteSpheres />
        <BlueSpheres />
        <TestSpheres />
        <Lights />
        <Environment />
      </Canvas>

    </div>
  );
}

export default App;

