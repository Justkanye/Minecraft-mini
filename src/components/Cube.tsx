import { useBox } from '@react-three/cannon';
import type { ThreeEvent } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { useState } from 'react';
import { TextureLoader } from 'three';

import { useStore } from '@/hooks';
import { type Cube as CUBE } from '@/types';
import { getTextureSrc } from '@/utils/helpers';

const CUBE_FACES = [...Array(6)];

const Cube = ({ pos, texture }: CUBE) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: pos,
  }));
  const [hover, setHover] = useState<number>();
  const [addCube, removeCube] = useStore((s) => [s.addCube, s.removeCube]);

  const color = useLoader(TextureLoader, getTextureSrc(texture));
  const ambient = useLoader(
    TextureLoader,
    getTextureSrc(texture, 'ambientOcclusion')
  );
  const normal = useLoader(TextureLoader, getTextureSrc(texture, 'normal'));
  const roughness = useLoader(
    TextureLoader,
    getTextureSrc(texture, 'roughness')
  );

  const handleCubeClick = ({
    stopPropagation,
    faceIndex,
    nativeEvent: { altKey },
  }: ThreeEvent<MouseEvent>) => {
    stopPropagation();
    if (faceIndex) {
      const clickedFace = Math.floor(faceIndex / 2);
      const [x, y, z] = pos;
      if (altKey) removeCube(x, y, z);
      else
        switch (clickedFace) {
          case 0:
            addCube(x + 1, y, z);
            break;
          case 1:
            addCube(x - 1, y, z);
            break;
          case 2:
            addCube(x, y + 1, z);
            break;
          case 3:
            addCube(x, y - 1, z);
            break;
          case 4:
            addCube(x, y, z + 1);
            break;
          case 5:
            addCube(x, y, z - 1);
            break;
          default:
            break;
        }
    }
  };

  return (
    <mesh
      castShadow
      // @ts-ignore
      ref={ref}
      onPointerMove={({ stopPropagation, faceIndex }) => {
        stopPropagation();
        // console.log(faceIndex / 2);
        if (faceIndex) setHover(Math.floor(faceIndex / 2));
      }}
      onPointerOut={() => setHover(undefined)}
      onClick={handleCubeClick}
    >
      {CUBE_FACES.map((_, i) => (
        <meshStandardMaterial
          key={i}
          map={color}
          aoMap={ambient}
          normalMap={normal}
          roughnessMap={roughness}
          color={hover === i ? 'blue' : 'white'}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};

export default Cube;
