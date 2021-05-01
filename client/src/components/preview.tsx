import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { testBin } from "../fixtures";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Scene from "./scene";

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Box(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  return (
    <mesh {...props} ref={mesh} scale={1}>
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={"orange"} wireframe />
    </mesh>
  );
}

export default function Preview({ APIResult }) {
  return (
    <div
      style={{ width: "50%", height: "100vh", borderLeft: "solid black 2px" }}
    >
      <Canvas
        onCreated={(state) => {
          state.gl.setClearColor("#f9f9f9");
        }}
      >
        <Suspense
          fallback={
            <mesh>
              <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
              <meshStandardMaterial attach="material" transparent opacity={0} />
            </mesh>
          }
        >
          <Scene APIResult={APIResult} />
        </Suspense>
      </Canvas>
    </div>
  );
}
