import { lazy } from 'react';

import { getGenesisCode } from '@/app/(features)/_genesis-code/_lib/get-genesis-code';

function GlyphImage({ digit }: { digit: string }) {
  const GlpyhElement = lazy(
    () =>
      import(`@/app/(features)/_genesis-code/_components/gen-icon-${digit}`),
  );
  return (
    <GlpyhElement className="text-primary-300 h-12 w-12 drop-shadow-[0_0_0.1rem_rgb(var(--color-primary-400))]" />
  );
}

export function GenesisCodeDisplay() {
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
          className="grid grid-cols-2 gap-y-4 px-4 sm:gap-x-12 sm:gap-y-0"
        >
          <div
            id="code-top-row"
            className="col-span-full flex flex-col items-center justify-center sm:col-span-1"
          >
            <h3 className="text-md text-surface-solid mb-1 font-bold underline">
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
            <h3 className="text-md text-surface-solid mb-1 font-bold underline">
              Bottom Row
            </h3>
            <div className="flex flex-row items-center justify-center gap-x-2">
              {bottomCode.split('').map((digit, index) => (
                <GlyphImage key={`bottom-row-${index}`} digit={digit} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-accent3-500 text-center text-sm">
          Note: If your code doesn't match, restart the game
        </p>
      </div>
    </>
  );
}
