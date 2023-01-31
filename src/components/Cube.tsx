import { useBox } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber';
import type { FC } from 'react';
import { TextureLoader } from 'three';

import type { Cube as CUBE } from '@/types';
import { CubeType } from '@/types';

const Cube: FC<Props> = ({ cube }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: cube.pos,
  }));

  const type = () => {
    switch (cube.type) {
      case CubeType.GRASS:
        return 'grass';

      case CubeType.WATER:
        return 'door';

      default:
        return 'bricks';
    }
  };

  const color = useLoader(TextureLoader, `/textures/${type()}/color.jpg`);
  const ambient = useLoader(
    TextureLoader,
    `/textures/${type()}/ambientOcclusion.jpg`
  );
  const normal = useLoader(TextureLoader, `/textures/${type()}/normal.jpg`);
  const roughness = useLoader(
    TextureLoader,
    `/textures/${type()}/roughness.jpg`
  );

  return (
    // @ts-ignore
    <mesh castShadow ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      {[...Array(6)].map((_, i) => (
        <meshStandardMaterial
          key={i}
          map={color}
          aoMap={ambient}
          normalMap={normal}
          roughnessMap={roughness}
        />
      ))}
    </mesh>
  );
};

export default Cube;

type Props = {
  cube: CUBE;
};
