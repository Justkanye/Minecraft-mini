import { useEffect, useState } from 'react';

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
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log({ key: e.key, code: e.code });
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      console.log({ key: e.key, code: e.code });
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
};
