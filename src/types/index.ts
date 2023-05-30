import type { Triplet } from '@react-three/cannon';

export enum CubeTexture {
  WOOD = 0,
  WATER = 1,
  GRASS = 2,
}

export type Cube = {
  pos: Triplet;
  texture: CubeTexture;
};
