import { useFrame, useLoader, useThree } from "react-three-fiber";
import React, { useEffect, useRef } from "react";
import TestSpheres from "./../../Components/TestSpheres";
import Environment from "./../../Components/Environment";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Lights from "./../../Components/Lights";
import { WebGLRenderer } from "three";
import * as THREE from "three";

const Axe = props => {
  const model = useLoader(GLTFLoader, "/scene.gltf");
  const axeRef = useRef();
  const { viewport } = useThree();
  let readyToExplode = false;
  let countAxeClicks = 0;
  let introAnimationDone = false;
  let axeToEmeraldAnimationDone = false;
  let isAxeClicked = false;
  let clockwiseFlag = false;
  let zTiltCounter = 0;
  let frameCounter = 0;
  const zlowTilt = 1.65;
  const zhighTilt = 1.9;
  const zTiltSpeed = 0.04;
  const zlowTiltUpperBoundary = zlowTilt + zTiltSpeed * 1.5;
  const zlowTiltBottomBoundary = zlowTilt - zTiltSpeed * 1.5;
  const zhighTiltUpperBoundary = zhighTilt + zTiltSpeed * 1.5;
  const zhighTiltBottomBoundary = zhighTilt - zTiltSpeed * 1.5;

  const axeClicked = () => {
    console.log("I am being clicked");
    if (introAnimationDone === true) {
      isAxeClicked = true;
      frameCounter = 0;
    }
  };

  useEffect(() => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
  }, []);

  const floatAxe = () => {
    if (frameCounter < 76) {
      axeRef.current.rotation.x = axeRef.current.rotation.x - 0.0001;
      axeRef.current.rotation.y = axeRef.current.rotation.y + 0.0001;
    } else if (frameCounter < 150) {
      axeRef.current.rotation.x = axeRef.current.rotation.x + 0.0001;
      axeRef.current.rotation.y = axeRef.current.rotation.y - 0.0001;
    }
    if (frameCounter > 150) {
      frameCounter = 0;
      zTiltCounter = 0;
    }
  };

  const axeToEmeraldAnimation = () => {
    let toEmeraldFlag = false;
    backAndForth();

    if (countAxeClicks === 2) {
      toEmeraldFlag = true;
      backAndForth();
    }

    function backAndForth() {
      if (
        isAxeClicked === true &&
        introAnimationDone === true &&
        axeToEmeraldAnimationDone === false &&
        frameCounter < 50 &&
        countAxeClicks < 3
      ) {
        axeRef.current.position.x = axeRef.current.position.x + 0.2025;
        axeRef.current.position.y = axeRef.current.position.y + 0.05;
        if (toEmeraldFlag === false) {
          axeRef.current.position.z = axeRef.current.position.z + 0.01;
        } else if (toEmeraldFlag === true) {
          axeRef.current.position.z = axeRef.current.position.z - 0.2;
          axeRef.current.rotation.z = axeRef.current.rotation.z - 1.25;
        }
        frameCounter = frameCounter + 1;
      } else if (
        isAxeClicked === true &&
        introAnimationDone === true &&
        axeToEmeraldAnimationDone === false &&
        frameCounter >= 50 &&
        frameCounter < 100 &&
        countAxeClicks < 3
      ) {
        if (toEmeraldFlag === false) {
          axeRef.current.position.x = axeRef.current.position.x - 0.2;
          axeRef.current.position.y = axeRef.current.position.y - 0.05;
        } else if (toEmeraldFlag === true) {
          axeRef.current.position.x = axeRef.current.position.x - 0.2;
          axeRef.current.position.y = axeRef.current.position.y - 0.05;
          axeRef.current.rotation.z = axeRef.current.rotation.z + 1.25;
          if (axeRef.current.position.x < 1.05) {
            axeToEmeraldAnimationDone = true;
            isAxeClicked = false;
          }
        }
        frameCounter = frameCounter + 1;
        if (frameCounter === 100) {
          countAxeClicks = countAxeClicks + 1;
        }
      }
    }
  };

  const smashTheEmerald = mouse => {
    if (
      mouse.x > 0.35 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = -0.2;
      axeRef.current.rotation.x = -0.02;
    } else if (
      mouse.x > 0.3 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0;
      axeRef.current.rotation.x = 0;
    } else if (
      mouse.x > 0.25 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.2;
      axeRef.current.rotation.x = 0.02;
    } else if (
      mouse.x > 0.25 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.4;
      axeRef.current.rotation.x = 0.04;
    } else if (
      mouse.x > 0.2 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.6;
      axeRef.current.rotation.x = 0.06;
    } else if (
      mouse.x > -5 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.6;
      axeRef.current.rotation.x = 0.06;
    }

    if (
      mouse.x > -0.2 &&
      mouse.x < 0.2 &&
      mouse.y > -0.2 &&
      mouse.y < 0.2 &&
      isAxeClicked === true &&
      axeToEmeraldAnimationDone === true &&
      frameCounter > 100
    ) {
      readyToExplode = true;
    }
  };

  const wiggleAxe = () => {
    frameCounter = frameCounter + 1;

    floatAxe();

    if (
      axeRef.current.rotation.z > zlowTilt &&
      axeRef.current.rotation.z < zhighTilt &&
      clockwiseFlag === false
    ) {
      if (zTiltCounter < 4 && zTiltCounter > -1) {
        axeRef.current.rotation.z = axeRef.current.rotation.z + zTiltSpeed;
        if (zTiltCounter < 2) {
          axeRef.current.rotation.y =
            axeRef.current.rotation.y + zTiltSpeed / 10;
          axeRef.current.rotation.x =
            axeRef.current.rotation.x + zTiltSpeed / 10;
        } else if (zTiltCounter < 4) {
          axeRef.current.rotation.y =
            axeRef.current.rotation.y - zTiltSpeed / 10;
          axeRef.current.rotation.x =
            axeRef.current.rotation.x - zTiltSpeed / 10;
        }
      }

      if (
        axeRef.current.rotation.z > zhighTiltBottomBoundary &&
        axeRef.current.rotation.z < zhighTiltUpperBoundary
      ) {
        clockwiseFlag = true;
        zTiltCounter = zTiltCounter + 1;
      }
    }

    if (
      axeRef.current.rotation.z < zhighTiltUpperBoundary &&
      axeRef.current.rotation.z > zlowTiltBottomBoundary &&
      clockwiseFlag === true
    ) {
      axeRef.current.rotation.z = axeRef.current.rotation.z - zTiltSpeed;

      if (
        axeRef.current.rotation.z > zlowTiltBottomBoundary &&
        axeRef.current.rotation.z < zlowTiltUpperBoundary
      ) {
        clockwiseFlag = false;
        zTiltCounter = zTiltCounter + 1;
      }
    }
  };

  useFrame(({ mouse }) => {
    frameCounter = frameCounter + 1;

    console.log(readyToExplode);
    if (
      frameCounter > 50 &&
      frameCounter <= 100 &&
      introAnimationDone === false &&
      isAxeClicked === false
    ) {
      axeRef.current.rotation.y = axeRef.current.rotation.y + 0.1255 * 2;
      if (axeRef.current.rotation.y > 12.5) {
        introAnimationDone = true;
        frameCounter = 0;
      }
    }

    if (isAxeClicked === false && introAnimationDone === true) {
      wiggleAxe();
    }

    if (axeToEmeraldAnimationDone === false) {
      axeToEmeraldAnimation();
    }

    smashTheEmerald(mouse);
  });

  return (
    <group>
      <mesh>
        <primitive
          ref={axeRef}
          object={model.scene}
          position={[0, 0, 0]}
          rotation={[0, 0, 1.75]}
          scale={[10, 10, 10]}
          onClick={axeClicked}
        />
      </mesh>
      <Lights />
      <TestSpheres />
      <Environment />
    </group>
  );
};

export default Axe;
