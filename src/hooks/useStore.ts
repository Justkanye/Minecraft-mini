import { useLayoutEffect } from 'react';
import type { UseBoundStore } from 'zustand';
import create from 'zustand';
import createContext from 'zustand/context';
import { combine, persist } from 'zustand/middleware';

import type { Cube } from '../types';
import { CubeType } from '../types';

let store: any;

type InitialState = ReturnType<typeof getDefaultInitialState>;
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseBoundStore<infer T>
  ? T
  : never;

const getDefaultInitialState = () => {
  const cubes: Cube[] = [
    {
      pos: [0, 1, 0],
      type: 0,
    },
  ];
  const texture: CubeType = CubeType.WOOD;
  return { cubes, texture };
};

const zustandContext = createContext<UseStoreState>();
export const { Provider, useStore } = zustandContext;

export const initializeStore = (preloadedState = {}) => {
  return create(
    persist(
      combine({ ...getDefaultInitialState(), ...preloadedState }, (set) => ({
        addCube: (cube: Cube) =>
          set(({ cubes }) => ({ cubes: [...cubes, cube] })),
        removeCube: (x: number, y: number, z: number) =>
          set(({ cubes }) => ({
            cubes: cubes.filter(
              (c) => c.pos[0] !== x || c.pos[1] !== y || c.pos[2] !== z
            ),
          })),
        setTexture: (texture: number) => set({ texture }),
        reset: () => set(getDefaultInitialState()),
      })),
      { name: 'Minecraft_store' }
    )
  );
};

export const useCreateStore = (serverInitialState: InitialState) => {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState);
  }

  const isReusingStore = Boolean(store);
  // For CSR, always re-use same store.
  store = store ?? initializeStore(serverInitialState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
};
