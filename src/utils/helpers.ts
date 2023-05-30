import { CubeTexture } from '@/types';

export const getTexture = (textureID: number) => {
  switch (textureID) {
    case CubeTexture.GRASS:
      return 'grass';

    case CubeTexture.WATER:
      return 'door';

    default:
      return 'bricks';
  }
};

export const getTextureSrc = (
  textureID: number,
  imageName = 'color',
  ext = 'jpg'
) => `/textures/${getTexture(textureID)}/${imageName}.${ext}`;
