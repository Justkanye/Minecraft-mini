import type { Triplet } from '@react-three/cannon';

export enum CubeType {
  WOOD,
  WATER,
  GRASS,
}

export type Cube = {
  pos: Triplet;
  type: CubeType;
};
