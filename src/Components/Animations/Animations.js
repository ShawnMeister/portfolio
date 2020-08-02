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
import React, { useEffect, useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { WebGLRenderer } from "three";

const Animations = ({ showForeground, isDisplayed, callbackFromParent }) => {
  const meshRef = useRef();
  const diamondRef = useRef();
  const time = useRef(0);

  // position
  /*   const position = useMemo(() => {
			return [random(-5, 5, true), random(-10, 10, true), random(-5, 5, true)];
			}, []); */

  const position = useMemo(() => {
    return [0, 0, 0];
  }, []);

  // random time mod factor
  /*  const timeMod = useMemo(() => random(0.1, 4, true), []); */

  //const timeMod = useMemo(() => 2, []);

  // color
  // let color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

  // raf loop
  //that means request animation frame
  useFrame(() => {
    /* mesh.current.rotation.y += 0.01 * timeMod; */
    if (!axeToEmeraldAnimationDone) {
      meshRef.current.rotation.y += 0.05;
    }
  });

  // Hover Events
  /*   const onHover = useCallback(
			(e, value) => {
			  e.stopPropagation();
			  setIsHovered(value);
			},
			[setIsHovered]
		  ); */

  // const onClick = useCallback(
  //   (e) => {
  //     e.stopPropagation();
  //     setIsActive((v) => !v);
  //   },
  //   [setIsActive]
  // );

  const model = useLoader(GLTFLoader, "/scene.gltf");

  const axeRef = useRef();
  const { viewport } = useThree();
  let readyToExplode = false;
  let explosionDone = false;
  let countAxeClicks = 0;
  let introAnimationDone = false;
  let axeToEmeraldAnimationDone = false;
  let isAxeClicked = false;
  let clockwiseFlag = false;
  const lightRef = useRef();

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
      // const flashTheAxe = () => {
      //   var light = new THREE.PointLight(0xff0000, 1, 100);
      //   light.position.set(50, 50, 50);
      //   scene.add(light);
      //   return;
      // };

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

            isAxeClicked = false;
            // flashTheAxe();
          }
        }
        frameCounter = frameCounter + 1;
        if (frameCounter === 100) {
          countAxeClicks = countAxeClicks + 1;
        }
      }
    }
  };

  const smashTheEmerald = (mouse) => {
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
  //the control frame
  useFrame(({ mouse }) => {
    if (explosionDone === false) {
      frameCounter = frameCounter + 1;

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

      if (
        isAxeClicked === false &&
        introAnimationDone === true &&
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
      tempCounter = frameCounter + 5;
    }
    if (readyToExplode === true) {
      base = s + base;
      sphereRef.current.scale.set(base, base, base);
    }

    if (
      readyToExplode === true &&
      tempCounterSetBool === true &&
      frameCounter === tempCounter &&
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
    console.log("You working?");
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
