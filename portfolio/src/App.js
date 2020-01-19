import React, { useRef, useState, useEffect, Suspense } from 'react';
import './App.css';
import { Canvas, useThree, useFrame } from "react-three-fiber";
import Credits from './Components/Credits';
import BlueSpheres from './Components/BlueSpheres';
import WhiteSpheres from './Components/WhiteSpheres';
import TestSpheres from './Components/TestSpheres';
import Lights from './Components/Lights';
import Environment from './Components/Environment';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import Controls from './Components/Controls.js';
// import oControls from './Components/oControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';


import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

function PullRelease() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 })
  })

  // Bind it to a component
  return <animated.DestinyAxe {...bind()} style={{ x, y }} />

  // const controls = useRef()
  // useFrame(state => controls.current.update())
  // return <orbitControls ref={controls} />


}



const App = props => {


  function PullRelease() {
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
      set({ x: down ? mx : 0, y: down ? my : 0 })
    })

    // Bind it to a component
    return <primitive {...bind()} style={{ x, y }} />

    // const controls = useRef()
    // useFrame(state => controls.current.update())
    // return <orbitControls ref={controls} />


  }


  const DestinyAxe = () => {
    // var [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

    let x,y;
    x = 0
    const { camera, gl, mouse, intersect, viewport } = useThree();
    // size = canvas in pixels
    // viewport = canvas in 3d units (meters)
    const [model, setModel] = useState();
    

    // Set the drag hook and define component movement based on gesture data
    


    useEffect(() => {
      const primitive = new GLTFLoader().load("/scene.gltf", setModel)
      const renderer = new WebGLRenderer({ antialias: true });
      // const dragControls = new DragControls(model, camera, renderer.domElement);

    }, []

    )

   



    

    // const prim = useRef(primitive)
    useFrame(({ mouse }) => {
      
      
        // prim.current.position.x = (mouse.x * viewport.width) / 2
        
      // y = (mouse.y * viewport.height) / 2

      // console.log(x);
      
      //  ref.current.position.set(x,y,0);

      //  console.log(x + " " + y);

      // ref.current.position(x,y,1)


      // intersect((e) => {e.position.y=model.rotation } )

      // ref.current.rotation(x, y, 2.5) 

    })



    return  ( 
     model ? <primitive castShadow object={model.scene} position={[ x , 0, 0]} rotation={[0, 0, 1.75]} scale={[10, 10, 10]} /> : null);



  }


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

      <mesh ref={ref} castShadow >
        <dodecahedronBufferGeometry attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh>
    )
  }





  return (

    <div className="App"  >
      <Credits />

      <Canvas camera={{ position: [0, 0, 4] }}>
        {/* <oControls/> */}
        
        <WhiteSpheres />
        <BlueSpheres />
        <TestSpheres />

        <Lights />
        <Environment />
        <Suspense fallback={null}>
          {/* <PullRelease /> */}
          <DestinyAxe />
        </Suspense>



        {/* <Dodecahedron /> */}


      </Canvas>


    </div>
  );

}
export default App;
