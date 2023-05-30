import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import type { Cube } from '../types';
import { CubeTexture } from '../types';

const getDefaultInitialState = () => {
  const cubes: Cube[] = [];
  const texture: CubeTexture = CubeTexture.WOOD;
  return { cubes, texture };
};

export const useStore = create(
  persist(
    combine(getDefaultInitialState(), (set) => ({
      addCube: (x: number, y: number, z: number) =>
        set(({ cubes, texture }) => {
          if (
            cubes.findIndex(
              ({ pos }) => pos[0] === x && pos[1] === y && pos[2] === z
            ) > -1
          )
            return { cubes };

          return {
            cubes: [
              ...cubes,
              {
                pos: [x, y, z],
                texture,
              },
            ],
          };
        }),
      removeCube: (x: number, y: number, z: number) =>
        set(({ cubes }) => ({
          cubes: cubes.filter(
            ({ pos }) => pos[0] !== x || pos[1] !== y || pos[2] !== z
          ),
        })),
      setTexture: (texture: number) => set({ texture }),
      reset: () => set(getDefaultInitialState()),
    })),
    { name: 'Minecraft_store' }
  )
);
