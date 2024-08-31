/**
 * This script is used to convert the save file from binary to text
 * I have extracted the logic as a script so that I could run it standalone
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function readChunkHeader(buffer: Buffer) {
  return {
    unknown: buffer.readBigUInt64LE(0),
    unknown2: buffer.readBigUInt64LE(8),
    unknown3: buffer.readUInt8(16),
    CompressedSize1: buffer.readBigUInt64LE(17),
    DecompressedSize1: buffer.readBigUInt64LE(25),
    CompressedSize2: buffer.readBigUInt64LE(33),
    DecompressedSize2: buffer.readBigUInt64LE(41),
  };
}

function decompressSave(fileBuffer: any) {
  const memstream = [];
  let offset = 0xc;

  while (offset < fileBuffer.length) {
    const headerBuffer = fileBuffer.slice(offset, offset + 49); // Adjust the length accordingly
    const header = readChunkHeader(headerBuffer);

    const compressedData = fileBuffer.slice(
      offset + 49,
      offset + 49 + Number(header.CompressedSize1),
    );
    const decompressedData = zlib.inflateSync(compressedData);

    memstream.push(decompressedData);
    offset += 49 + Number(header.CompressedSize1);
  }

  return Buffer.concat(memstream);
}

async function main() {
  const buffer = fs.readFileSync(path.join(__dirname, './profile.sav'));
  try {
    const convertedSave = decompressSave(Buffer.from(buffer))
      .toString()
      .toLowerCase();

    // write converted save to a file
    fs.writeFileSync(path.join(__dirname, './profile.txt'), convertedSave);
  } catch (e) {
    console.error('Error in parseSaveFile', e);
    return {
      convertedSave: null,
    };
  }
}

main();
