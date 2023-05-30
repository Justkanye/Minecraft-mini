import type { Triplet } from '@react-three/cannon';
import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import type { FC, MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

import { useKeyboardControls } from '@/hooks';

const SPEED = 6;

const Player: FC<Props> = ({ position }) => {
  const { camera, gl } = useThree();
  const [ref, api] = useSphere(() => ({
    type: 'Dynamic',
    mass: 1,
    position,
  }));
  const velocity: MutableRefObject<Triplet> = useRef([0, 0, 0]);
  const controls = new PointerLockControls(camera, gl.domElement);

  useEffect(() => {
    api.velocity.subscribe((v) => {
      velocity.current = v;
    });
    api.position.subscribe((p) => {
      camera.position.copy(new Vector3(...p));
    });
    document.addEventListener('click', () => controls.lock());
  }, []);

  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboardControls();

  useFrame(() => {
    const frontZ = (moveBackward ? 1 : 0) - (moveForward ? 1 : 0);
    const sideX = (moveLeft ? 1 : 0) - (moveRight ? 1 : 0);
    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, frontZ);
    const sideVector = new Vector3(sideX, 0, 0);
    const y =
      jump && parseFloat(Math.abs(velocity.current[1]).toFixed(2)) < 0.05
        ? 8
        : velocity.current[1];
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, y, direction.z);
  });

  // @ts-ignore
  return <mesh castShadow ref={ref} />;
};

export default Player;

type Props = {
  position: Triplet;
};
