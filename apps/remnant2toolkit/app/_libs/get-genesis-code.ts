/**
 * To calculate the current code show on the top row in game you can
 * do calculateCode(Date.now() / 1000);
 *
 * To calculate the next code (the one you need to input in-game) you
 * can do calculateCode(Date.now() / 1000 + 3600); adding an hour to the previous one
 */
function calculateCode(ts: number): string {
  const seeds = {
    code: 9358314,
    date: 1690297200,
    offsets: [10, 0, 10, 0, 2, 8, 2, 8],
  };

  const index = Math.floor((ts - seeds.date) / 3600);
  const offset = seeds.offsets[index % 8] ?? 0;
  const code = ((index * seeds.code + 2 ** 31) % 2 ** 32) - 2 ** 31 + offset;
  return code.toString().slice(-4).padStart(4, '0');
}

/**
 * Top row is the top row of the code in-game
 * Bottom row is the bottom row of the code in-game, and the one you need to input
 */
export function getGenesisCode({
  timestamp,
  row = 'bottom',
}: {
  timestamp: number;
  row?: 'top' | 'bottom';
}) {
  if (row === 'top') {
    return calculateCode(timestamp / 1000);
  }
  return calculateCode(timestamp / 1000 + 3600);
}
