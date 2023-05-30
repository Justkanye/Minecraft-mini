import type { Triplet } from '@react-three/cannon';

export enum CubeTexture {
  WOOD,
  WATER,
  GRASS,
}

export type Cube = {
  pos: Triplet;
  texture: CubeTexture;
};
