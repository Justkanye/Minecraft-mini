import type { Triplet } from '@react-three/cannon';
import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import type { FC } from 'react';

const Player: FC<Props> = ({ position }) => {
  const { camera } = useThree();
  const [ref] = useSphere(() => ({
    type: 'Dynamic',
    mass: 1,
    position,
  }));

  useFrame(() => {
    if (ref.current) camera.position.copy(ref.current.position);
  });

  return (
    // @ts-ignore
    <mesh castShadow ref={ref} />
  );
};

export default Player;

type Props = {
  position: Triplet;
};
