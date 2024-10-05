import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { getGenesisCode } from '../_libs/get-genesis-code';

function GlyphImage({ digit }: { digit: string }) {
  const baseImagePath = `${getImageUrl('/misc/genesis-vault')}`;
  return (
    <Image
      src={`${baseImagePath}/${digit}.png`}
      width={36}
      height={36}
      alt={digit}
      quality={74}
    />
  );
}

export function GenesisCode() {
  const topCode = getGenesisCode({ timestamp: Date.now(), row: 'top' });
  const bottomCode = getGenesisCode({ timestamp: Date.now(), row: 'bottom' });

  return (
    <>
      <h2 className="text-surface-solid w-full text-center text-2xl font-bold">
        Genesis Code
      </h2>
      <div className="flex w-full flex-col items-center justify-center">
        <div
          id="code-container"
          className="grid grid-cols-2 gap-y-4 bg-black px-4 dark:bg-transparent sm:gap-x-12 sm:gap-y-0"
        >
          <div
            id="code-top-row"
            className="col-span-full flex flex-col items-center justify-center sm:col-span-1"
          >
            <h3 className="text-md mb-1 font-bold text-white underline">
              Top Row
            </h3>
            <div className="flex flex-row items-center justify-center gap-x-2">
              {topCode.split('').map((digit, index) => (
                <GlyphImage key={`top-row-${index}`} digit={digit} />
              ))}
            </div>
          </div>
          <div
            id="code-bottom-row"
            className="col-span-full flex flex-col items-center justify-center sm:col-span-1"
          >
            <h3 className="text-md mb-1 font-bold text-white underline">
              Bottom Row
            </h3>
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
