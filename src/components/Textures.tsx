import Image from 'next/image';

import { useStore } from '@/hooks';
import { CubeTexture } from '@/types';
import { getTextureSrc } from '@/utils/helpers';

const tempTextures = Object.keys(CubeTexture);
const textures = tempTextures.slice(tempTextures.length / 2);

const Textures = () => {
  const currentTexture = useStore((s) => s.texture);
  return (
    <div className="fixed left-2 bottom-2 flex items-center gap-4">
      {textures.map((t, i) => (
        <div className="flex flex-col items-center gap-1" key={t}>
          <h4
            className={`font-semibold ${
              currentTexture === i ? 'text-yellow-400' : 'text-white'
            }`}
          >
            {i + 1}
          </h4>
          <Image alt={t} src={getTextureSrc(i)} width={40} height={40} />
        </div>
      ))}
    </div>
  );
};

export default Textures;
