import type { Triplet } from '@react-three/cannon';
import { usePlane } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber';
import type { FC } from 'react';
import { RepeatWrapping, TextureLoader } from 'three';

const Ground: FC<Props> = ({ position }) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position,
  }));

  const color = useLoader(TextureLoader, '/textures/grass/color.jpg');
  color.wrapS = RepeatWrapping;
  color.wrapT = RepeatWrapping;
  color.repeat.set(35, 35);

  const ambient = useLoader(
    TextureLoader,
    '/textures/grass/ambientOcclusion.jpg'
  );
  ambient.wrapS = RepeatWrapping;
  ambient.wrapT = RepeatWrapping;
  ambient.repeat.set(35, 35);

  const normal = useLoader(TextureLoader, '/textures/grass/normal.jpg');
  normal.wrapS = RepeatWrapping;
  normal.wrapT = RepeatWrapping;
  normal.repeat.set(35, 35);

  const roughness = useLoader(TextureLoader, '/textures/grass/roughness.jpg');
  roughness.wrapS = RepeatWrapping;
  roughness.wrapT = RepeatWrapping;
  roughness.repeat.set(35, 35);

  return (
    // @ts-ignore
    <mesh receiveShadow ref={ref}>
      <planeBufferGeometry args={[100, 100]} attach="geometry" />
      <meshStandardMaterial
        map={color}
        aoMap={ambient}
        normalMap={normal}
        roughnessMap={roughness}
        attach="material"
      />
    </mesh>
  );
};
export default Ground;

type Props = {
  position: Triplet;
};
