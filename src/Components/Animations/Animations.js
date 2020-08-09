/*
Emerald Params are below
magic button that goes to portfolio from landing Page
const radius 8
widthSegment goes from 31 to 3 while
heightsegment goes from 32 to 4
const phistart 6
philength goes from 6.3 to 0 while
thetastart goes from 6 to 0
philength goes back to 6.3 and goes to 0 while
thetalength drops from 6.3 to 0
radius
widthSegments
heightSegments
phiStart
phiLength
thetaStart
thetaLength
*/

import { useFrame, useLoader, useThree } from "react-three-fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { WebGLRenderer } from "three";

const Animations = ({ showForeground, isDisplayed, callbackFromParent }) => {
  const meshRef = useRef();
  const diamondRef = useRef();
  // const time = useRef(0);

  const position = useMemo(() => {
    return [0, 0, 0];
  }, []);

  useFrame(() => {
    if (!axeToEmeraldAnimationDone) {
      meshRef.current.rotation.y += 0.05;
    }
  });

  const model = useLoader(GLTFLoader, "/scene.gltf");
  const axeRef = useRef();
  const { viewport } = useThree();
  const zlowTilt = 1.65;
  const zhighTilt = 1.9;
  const zTiltSpeed = 0.04;
  const zlowTiltUpperBoundary = zlowTilt + zTiltSpeed * 1.5;
  const zlowTiltBottomBoundary = zlowTilt - zTiltSpeed * 1.5;
  const zhighTiltUpperBoundary = zhighTilt + zTiltSpeed * 1.5;
  const zhighTiltBottomBoundary = zhighTilt - zTiltSpeed * 1.5;

  const axeClicked = () => {
    if (introAnimationDone.current === true) {
      isAxeClicked.current = true;
      frameCounter.current = 0;
    }
  };

  useEffect(() => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;

    // let readyToExplode = false;
    // let explosionDone = false;
    // let countAxeClicks.current = 0;
    // let introAnimationDone.current = false;

    // let axeToEmeraldAnimationDone = false;
    // let isAxeClicked.current = false;
    // let clockwiseFlag = false;

    // let zTiltCounter = 0;
    // let frameCounter.current=0;
  }, []);

  let readyToExplode = false;
  let explosionDone = false;
  const countAxeClicks = useRef(0);

  // let countAxeClicks.current = 0;
  const introAnimationDone = useRef(false);
  const isAxeClicked = useRef(false);
  console.log(
    "at the declaration countAxeClicks.current: " + countAxeClicks.current
  );
  console.log("at the declaration is axe clicked: " + isAxeClicked.current);

  let axeToEmeraldAnimationDone = false;
  let clockwiseFlag = false;
  // const lightRef = useRef();

  let zTiltCounter = 0;
  const frameCounter = useRef(0);

  const floatAxe = () => {
    if (frameCounter.current < 76) {
      axeRef.current.rotation.x = axeRef.current.rotation.x - 0.0001;
      axeRef.current.rotation.y = axeRef.current.rotation.y + 0.0001;
    } else if (frameCounter.current < 150) {
      axeRef.current.rotation.x = axeRef.current.rotation.x + 0.0001;
      axeRef.current.rotation.y = axeRef.current.rotation.y - 0.0001;
    }
    if (frameCounter.current > 150) {
      frameCounter.current = 0;
      zTiltCounter = 0;
    }
  };

  const axeToEmeraldAnimation = () => {
    let toEmeraldFlag = false;
    backAndForth();

    console.log("inside axeToEmerald animation: " + countAxeClicks.current);
    if (countAxeClicks.current === 2) {
      toEmeraldFlag = true;
      backAndForth();
    }

    function backAndForth() {
      // const flashTheAxe = () => {
      //   var light = new THREE.PointLight(0xff0000, 1, 100);
      //   light.position.set(50, 50, 50);
      //   scene.add(light);
      //   return;
      // };

      if (
        isAxeClicked.current === true &&
        introAnimationDone.current === true &&
        axeToEmeraldAnimationDone === false &&
        frameCounter.current < 50 &&
        countAxeClicks.current < 3
      ) {
        axeRef.current.position.x = axeRef.current.position.x + 0.2025;
        axeRef.current.position.y = axeRef.current.position.y + 0.05;
        if (toEmeraldFlag === false) {
          axeRef.current.position.z = axeRef.current.position.z + 0.01;
        } else if (toEmeraldFlag === true) {
          axeRef.current.position.z = axeRef.current.position.z - 0.2;
          axeRef.current.rotation.z = axeRef.current.rotation.z - 1.25;
        }
        frameCounter.current = frameCounter.current + 1;
      } else if (
        isAxeClicked.current === true &&
        introAnimationDone.current === true &&
        axeToEmeraldAnimationDone === false &&
        frameCounter.current >= 50 &&
        frameCounter.current < 100 &&
        countAxeClicks.current < 3
      ) {
        //last time goes to emerald
        if (toEmeraldFlag === false) {
          axeRef.current.position.x = axeRef.current.position.x - 0.2;
          axeRef.current.position.y = axeRef.current.position.y - 0.05;
        } else if (toEmeraldFlag === true) {
          axeRef.current.position.x = axeRef.current.position.x - 0.2;
          axeRef.current.position.y = axeRef.current.position.y - 0.05;
          axeRef.current.rotation.z = axeRef.current.rotation.z + 1.25;
          if (axeRef.current.position.x < 1.05) {
            axeToEmeraldAnimationDone = true;
            // axeRef.current.position.x = 1.25;
            // axeRef.current.position.y = 0;
            axeRef.current.position.z += 0.5;
            axeRef.current.rotation.z += 0.15;
            // axeRef.current.position.x -= 0.2;

            // meshRef.current.position.x = 0;
            // meshRef.current.position.y = 0;
            meshRef.current.position.z += 0.5;
            isAxeClicked.current = false;
          }
        }
        frameCounter.current = frameCounter.current + 1;
        if (frameCounter.current === 100) {
          // setcountAxeClicks.current(countAxeClicks.current + 1);
          countAxeClicks.current = countAxeClicks.current + 1;
        }
      }
    }
  };

  const smashTheEmerald = (mouse) => {
    if (
      mouse.x > 0.35 &&
      isAxeClicked.current === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = -0.2;
      axeRef.current.rotation.x = -0.02;
    } else if (
      mouse.x > 0.3 &&
      isAxeClicked.current === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0;
      axeRef.current.rotation.x = 0;
    } else if (
      mouse.x > 0.25 &&
      isAxeClicked.current === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.2;
      axeRef.current.rotation.x = 0.02;
    } else if (
      mouse.x > 0.25 &&
      isAxeClicked.current === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.4;
      axeRef.current.rotation.x = 0.04;
    } else if (
      mouse.x > 0.2 &&
      isAxeClicked.current === true &&
      axeToEmeraldAnimationDone === true
    ) {
      axeRef.current.position.x = (mouse.x * viewport.width) / 2;
      axeRef.current.position.y = (mouse.y * viewport.height) / 2;
      axeRef.current.rotation.z = 0.6;
      axeRef.current.rotation.x = 0.06;
    } else if (
      mouse.x > -5 &&
      isAxeClicked.current === true &&
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
      isAxeClicked.current === true &&
      axeToEmeraldAnimationDone === true &&
      frameCounter.current > 100
    ) {
      readyToExplode = true;
    }
  };

  const wiggleAxe = () => {
    frameCounter.current = frameCounter.current + 1;

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
    if (explosionDone === false) {
      frameCounter.current = frameCounter.current + 1;

      if (
        frameCounter.current > 50 &&
        frameCounter.current <= 100 &&
        introAnimationDone.current === false &&
        isAxeClicked.current === false
      ) {
        axeRef.current.rotation.y = axeRef.current.rotation.y + 0.1255 * 2;
        if (axeRef.current.rotation.y > 12.5) {
          introAnimationDone.current = true;
          frameCounter.current = 0;
        }
      }

      if (
        isAxeClicked.current === false &&
        introAnimationDone.current === true &&
        axeToEmeraldAnimationDone === false
      ) {
        wiggleAxe();
      }

      if (axeToEmeraldAnimationDone === false) {
        axeToEmeraldAnimation();
      }

      smashTheEmerald(mouse);
    } else {
      axeRef.current.position.x = 100;
    }
  });

  const sphereRef = useRef();
  let base = 2;
  let s = 0.06;

  const sphere2Ref = useRef();
  let base2 = 1;
  let s2 = 0.1;
  let tempCounter = -1;
  let tempCounterSetBool = false;
  let afterFirst = false;

  useFrame(() => {
    if (readyToExplode === true && tempCounterSetBool === false) {
      tempCounterSetBool = true;
      tempCounter = frameCounter.current + 5;
    }
    if (readyToExplode === true) {
      base = s + base;
      sphereRef.current.scale.set(base, base, base);
      meshRef.current.scale.set(0.5, 0.5, 0.5);
    }

    if (
      readyToExplode === true &&
      tempCounterSetBool === true &&
      frameCounter.current === tempCounter &&
      afterFirst === false
    ) {
      base2 = s2 + base2;

      afterFirst = true;
      sphere2Ref.current.scale.set(base2, base2, base2);
    }

    if (afterFirst === true && explosionDone === false) {
      base2 = s2 + base2;
      sphere2Ref.current.scale.set(base2, base2, base2);

      if (explosionDone === false) {
      }
      setTimeout(function () {
        if (explosionDone === false) {
          explosionDone = true;
          showForeground = true;
          axeRef.current.visible = false;
          meshRef.current.visible = false;
          sphere2Ref.current.visible = false;
          sphereRef.current.visible = false;
          diamondRef.current.visible = false;
          callbackFromParent(showForeground);
        }
      }, 1500);
    }
  });

  const myCallback = (dataFromChild) => {
    dataFromChild = showForeground;
  };

  return [
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
      <mesh ref={sphereRef}>
        <sphereBufferGeometry
          args={[0.5, 30, 30]}
          attach="geometry"
          roughness={0.5}
          transparency={0.9}
        />
        <meshBasicMaterial color={0x61dafb} attach="material" />
      </mesh>
      <mesh ref={sphere2Ref}>
        <sphereBufferGeometry
          args={[0.5, 30, 30]}
          attach="geometry"
          roughness={0.5}
          transparency={0.9}
        />
        <meshBasicMaterial color={0x39ff14} attach="material" />
      </mesh>

      <mesh
        ref={meshRef}
        position={position}
        // onClick={(e) => onClick(e)}

        //onPointerOver={e => onHover(e, true)}
        //onPointerOut={e => onHover(e, false)}
      >
        {/* Below in args, the first argument is the size of the spheres
the second argument is  */}
        <sphereBufferGeometry
          attach="geometry"
          args={[1, 6.3, 6.3, 6, 6.3, 6.3, 6.3]}
        />
        {/* ,6,{philen},{thesta},{thelen} */}

        <meshStandardMaterial
          attach="material"
          color={0x39ff14}
          roughness={0.5}
          metalness={0.5}
          ref={diamondRef}
        />
      </mesh>
    </group>,
  ];
};
export default Animations;
