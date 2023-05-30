import { useEffect, useState } from 'react';

import { CubeTexture } from '@/types';

import { useStore } from './useStore';

export const useKeyboardControls = () => {
  const [setTexture] = useStore((s) => [s.setTexture]);
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  useEffect(() => {
    const getActionByKey = (key: string): string | null => {
      const keys = {
        ArrowUp: 'moveForward',
        ArrowDown: 'moveBackward',
        ArrowLeft: 'moveLeft',
        ArrowRight: 'moveRight',
        Space: 'jump',
      };
      // @ts-ignore
      if (Object.keys(keys).includes(key)) return keys[key];
      return null;
    };
    const getTextureByKey = (key: string): number | null => {
      const textures = {
        Digit1: CubeTexture.WOOD,
        Digit2: CubeTexture.WATER,
        Digit3: CubeTexture.GRASS,
      };
      // @ts-ignore
      if (Object.keys(textures).includes(key)) return textures[key];
      return null;
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionByKey(e.code);
      const texture = getTextureByKey(e.code);
      if (action) setMovement((prev) => ({ ...prev, [action]: true }));
      if (texture !== null) setTexture(texture);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const action = getActionByKey(e.code);
      if (action) setMovement((prev) => ({ ...prev, [action]: false }));
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
