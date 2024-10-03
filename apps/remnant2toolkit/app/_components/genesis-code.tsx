import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { getGenesisCode } from '../_libs/get-genesis-code';

function GlyphImage({ digit }: { digit: string }) {
  const baseImagePath = `${getImageUrl('/misc/genesis-vault')}`;
  return (
    <Image
      src={`${baseImagePath}/Genesis Glyph ${digit}.png`}
      width={36}
      height={36}
      alt={digit}
    />
  );
}

export function GenesisCode() {
  const topCode = getGenesisCode({ timestamp: Date.now(), row: 'top' });
  const bottomCode = getGenesisCode({ timestamp: Date.now(), row: 'bottom' });

  return (
    <>
      <h2 className="text-primary-500 w-full text-center text-2xl font-bold">
        Genesis Code
      </h2>
      <div className="flex w-full flex-col items-center justify-center">
        <div
          id="code-container"
          className="flex flex-row items-center justify-center gap-x-12"
        >
          <div
            id="code-top-row"
            className="flex flex-col items-center justify-center"
          >
            <h3 className="text-md mb-1 font-bold underline">Top Row</h3>
            <div className="flex flex-row items-center justify-center gap-x-2">
              {topCode.split('').map((digit, index) => (
                <GlyphImage key={`top-row-${index}`} digit={digit} />
              ))}
            </div>
          </div>
          <div
            id="code-bottom-row"
            className="flex flex-col items-center justify-center"
          >
            <h3 className="text-md mb-1 font-bold underline">Bottom Row</h3>
            <div className="flex flex-row items-center justify-center gap-x-2">
              {bottomCode.split('').map((digit, index) => (
                <GlyphImage key={`bottom-row-${index}`} digit={digit} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-red-500">
          Note: If your code doesn't match, restart the game
        </p>
      </div>
    </>
  );
}
