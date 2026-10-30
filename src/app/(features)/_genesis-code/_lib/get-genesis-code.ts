/**
 * To calculate the current code show on the top row in game you can
 * do calculateCode(Date.now() / 1000);
 *
 * To calculate the next code (the one you need to input in-game) you
 * can do calculateCode(Date.now() / 1000 + 3600); adding an hour to the previous one
 */

// Gunfire Games founding to the hour, in UTC
const anniversaryHour = 14;
const anniversaryDay = 15;
const anniversaryMonth = 8; // 0-indexed -> September
const anniversaryYear = 2014;

// always 365 days. leap years are not accounted for by the ingame code generation.
const SECONDS_PER_YEAR = 365 * 24 * 3600; 

const anniversaryEpoch =
  Date.UTC(anniversaryYear, anniversaryMonth, anniversaryDay, anniversaryHour) / 1000;

function getYearOffset(ts: number): number {
  return Math.floor((ts - anniversaryEpoch) / SECONDS_PER_YEAR);
}

function calculateCode(ts: number): string {
  const seeds = {
    code: 9358314,
    date: 1690297200
  };

  const index = Math.floor((ts - seeds.date) / 3600);
  const offset = getYearOffset(ts);
  const code = Math.imul(index, seeds.code) | offset;
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
