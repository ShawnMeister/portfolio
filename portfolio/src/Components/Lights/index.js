import React, { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

export default () => {
  const FakeSphere = () => {};

  return (
    <group>
      <pointLight intensity={1.12} position={[0, 0, 10]} />

      <directionalLight
        castShadow={true}
        intensity={0.1}
        position={[-10, 10, 40]}
      />
      <directionalLight
        castShadow={true}
        intensity={0.1}
        position={[10, 10, 40]}
      />

      <directionalLight
        castShadow={true}
        intensity={0.1}
        position={[-10, -10, 40]}
      />
      <directionalLight
        castShadow={true}
        intensity={0.1}
        position={[10, -10, 40]}
      />
    </group>
  );
};
