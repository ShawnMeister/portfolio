import React from "react";

export default () => {
  const FakeSphere = () => {
    return (
      <mesh>
        <sphereBufferGeometry args={[0.5, 30, 30]} attach="geometry" />
        <meshBasicMaterial color={0xfff1ef} attach="material" />
      </mesh>
    );
  };

  return (
    <group>
      <FakeSphere />

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
