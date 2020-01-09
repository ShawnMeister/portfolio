import React, { useRef, useState, useEffect, useFrame, Suspense } from 'react';
import './App.css';
import { Canvas, useThree,useFrame } from "react-three-fiber";
import Credits from './Components/Credits';
import BlueSpheres from './Components/BlueSpheres';
import WhiteSpheres from './Components/WhiteSpheres';
import TestSpheres from './Components/TestSpheres';
import Lights from './Components/Lights';
import Environment from './Components/Environment';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const controls = useRef()
useFrame(state => controls.current.update())
return <orbitControls ref={controls} />


const DestinyAxe = () => {
  // const { viewport } = useThree()
  // size = canvas in pixels
  // viewport = canvas in 3d units (meters)
  const [model, setModel] = useState()
  // const ref = useRef()

  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel)
  },[]

  )



  return model ? <primitive castShadow object={model.scene} /> : null



}





const App = props => {






  function Dodecahedron() {
    const { viewport } = useThree()
    // size = canvas in pixels
    // ciewport = canvas in 3d units (meters)

    const ref = useRef()
    useFrame(({ mouse }) => {
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2

      ref.current.position.set(x, y, 1)

      ref.current.rotation.set(-y, x, 0)
    })

    return (

      <mesh ref={ref} castShadow>
        <dodecahedronBufferGeometry attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh>
    )
  }


  return (

    <div className="App"  >
      {/* <Credits /> */}
      <Canvas camera={{ position: [0, 0, 0.4] }}>


        <WhiteSpheres />
      <BlueSpheres />
        {/* <TestSpheres /> */}
 
        <Lights />
        <Environment />
        <Suspense fallback={null}>
          <DestinyAxe />
          </Suspense>



        {/* <Dodecahedron /> */}


      </Canvas>


    </div>
  );

}
export default App;
