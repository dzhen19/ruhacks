import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
import {
  useThree,
  extend,
  ReactThreeFiber,
  useLoader,
} from "@react-three/fiber";
import { cardboardURL, allBoxes } from "../fixtures";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { fitCameraToSelection, TextMesh } from "../utils";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

const getRandomColorString = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

const Box = (props: any) => {
  const mesh = useRef<THREE.Mesh>(null!);

  let pos = props.position;
  let scale = props.scale ?? 1;
  if (props.scale) {
    pos = pos.map((x) => x * props.scale);
  }

  const color = useMemo(() => getRandomColorString(), []);

  return (
    <mesh position={pos} ref={mesh} scale={scale}>
      <boxGeometry args={props.size} />
      {props.texture ? (
        <meshStandardMaterial map={props.texture} color={color} />
      ) : (
        <meshStandardMaterial wireframe />
      )}
    </mesh>
  );
};

const Model = ({ position, assetPath, size }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  // three js objects can only be rendered once. make a copy
  const obj = useLoader(OBJLoader, assetPath);
  //@ts-ignore
  const obj_copy = useMemo(() => {
    const color = getRandomColorString();
    const BasicMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(getRandomColorString()),
    });
    //@ts-ignore
    const b = obj.clone();

    // center loaded model
    var box = new THREE.Box3().setFromObject(b);
    var center = new THREE.Vector3();
    box.getCenter(center);
    b.position.sub(center);

    // attach color material
    b.children.forEach((mesh, i) => {
      mesh.material = BasicMaterial;
    });
    return b;
  }, [obj]);
  //@ts-ignore
  const boundingBox = new THREE.Box3().setFromObject(obj);
  const bboxDim = boundingBox.getSize(boundingBox.min);

  const xScale = (100 * size[0]) / bboxDim.x;
  const yScale = (100 * size[1]) / bboxDim.y;
  const zScale = (100 * size[2]) / bboxDim.z;

  const pos = position.map((x) => x * 100);

  return (
    <mesh position={pos} scale={[xScale, yScale, zScale]} ref={mesh}>
      <primitive object={obj_copy} />
      <meshBasicMaterial attach="material" color="yellow" transparent />
    </mesh>
  );
};

const APIResultToWLH = (s1, s2, s3) => {
  return { w: s2, l: s3, h: s1 };
};

const WLHtoXYZ = (dim) => {
  return { x: dim.l, y: dim.h, z: dim.w };
};

const APIResulttoXYZ = (s1, s2, s3) => {
  return WLHtoXYZ(APIResultToWLH(s1, s2, s3));
};

export default function Scene({ APIResult }) {
  const result = APIResult.result[0];

  const axisRef = useRef();
  const [colorMap] = useLoader(TextureLoader, [cardboardURL]);

  extend({ OrbitControls });
  const binRef = useRef<THREE.Mesh>(null!);
  const controls = useRef(null);

  const {
    camera,
    gl: { domElement },
  } = useThree();

  const items = result.items
    ? result.items.map((item) => {
        const s1 = item.x_origin_in_bin;
        const s2 = item.y_origin_in_bin;
        const s3 = item.z_origin_in_bin;
        const position: any = Object.values(APIResulttoXYZ(s1, s2, s3));

        const size = Object.values(
          APIResulttoXYZ(item.sp_size_1, item.sp_size_2, item.sp_size_3)
        );
        // @ts-ignore
        const boxOrFurnitureObject = allBoxes.find(
          ({ id }) => item.boxTypeId === id
        );

        if (
          boxOrFurnitureObject &&
          boxOrFurnitureObject.brand === "furniture"
        ) {
          return (
            <Model
              position={position}
              assetPath={boxOrFurnitureObject.assetUrl}
              size={size}
            />
          );
        }
        return (
          <Box position={position} size={size} texture={colorMap} scale={100} />
        );
      })
    : null;

  useEffect(() => {
    if (axisRef.current) {
      //@ts-ignore
      axisRef.current.scale.set(10);
    }
    if (binRef.current && controls.current) {
      fitCameraToSelection(camera, controls.current, [binRef.current]);
    }
  }, [result, binRef]);

  return (
    <scene>
      <ambientLight intensity={0.5} />
      <orbitControls
        // @ts-ignore
        ref={controls}
        args={[camera, domElement]}
      />
      ;
      <pointLight position={[10, 10, 10]} />
      <TextMesh text={`${APIResult.binInfo.name} ${APIResult.binInfo.dim}`} />
      <mesh
        //BIN
        ref={binRef}
        scale={100}
      >
        <boxGeometry
          //@ts-ignore
          args={Object.values(
            APIResulttoXYZ(result.size_1, result.size_2, result.size_3)
          )}
        />
        <meshStandardMaterial color={"#1B7FFF"} wireframe />
      </mesh>
      {items}
    </scene>
  );
}
