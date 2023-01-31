import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PCFSoftShadowMap } from 'three';

import { useStore } from '../hooks';
import Ground from './Base';
import Cube from './Cube';
import Player from './Player';

const Scene = () => {
  const cubes = useStore((s) => s.cubes);
  return (
    <div
      css={{
        backgroundColor: 'black',
        width: '100%',
        height: '100vh',
      }}
      id="canvas-container"
    >
      <Canvas
        // camera={{ position: [4, 2, 5], fov: 75, near: 0.1, far: 100 }}
        color={'#262837'}
        shadows={{ type: PCFSoftShadowMap }}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            <Ground position={[0, 0.5, 0]} />
            <Player position={[0, 3, 10]} />
            {cubes.map((cube) => (
              <Cube key={cube.pos.join('-')} cube={cube} />
            ))}
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  );
};

export default Scene;
