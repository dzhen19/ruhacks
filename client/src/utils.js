import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import OpenSans from "./openSans.json";

export function fitCameraToSelection(
  camera,
  controls,
  selection,
  fitOffset = 1.2
) {
  const box = new THREE.Box3();

  for (const object of selection) box.expandByObject(object);

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  controls.maxDistance = distance * 10;
  controls.target.copy(center);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  const target = { x: -5, y: 5, z: 2 };
  camera.position.copy(target).sub(direction);

  controls.update();
}

export function TextMesh({ text, top = 8000 }) {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.geometry.center();
  });

  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(OpenSans);

  // configure font geometry
  const textOptions = {
    font,
    size: 2000,
    height: 1,
    color: "black",
  };

  return (
    <mesh position={[0, top, 0]} ref={mesh}>
      <textGeometry attach="geometry" args={[text, textOptions]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}
