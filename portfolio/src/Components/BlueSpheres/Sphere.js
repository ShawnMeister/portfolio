import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import { random } from "lodash";
import { useFrame } from "react-three-fiber";

export default () => {

  //mutable objects can be changed after they are created
  //the useRef method is used to keep track everytime something is rendered
  //it is generally used for counter variables, or variables that we want to keep
  //track of outside the scope of the normal rendering of React
  const mesh = useRef();
  const time = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  // position
  const position = useMemo(() => {
    return [random(-5, 50, true), random(-10, 10, true), random(-5, 5, true)];
  }, []);

  // random time mod factor
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  // color
  let color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);
color = 0x61dafb;

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // raf loop
  //this is what causes motion of the spheres
  useFrame(() => {
    mesh.current.rotation.y += 0.01 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    }
  });




  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );

  return (
    <mesh
      ref={mesh}
      position={position}

    >

      {/* Below in args, the first argument is the size of the spheres
the second argument is  */}
      <sphereBufferGeometry attach="geometry" args={[0.00647, 0.00005, 7]} />

      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};