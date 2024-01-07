/**
 * The bulk of this code was copied from Robin Kuiper's save file converted
 * https://gitlab.com/RobinKuiper/remnantcollectables/-/blob/development/api/data/convert/index.mjs?ref_type=heads
 * I made small changes to adapt it to NextJS
 */

'use server'

import zlib from 'zlib'
import { remnantItems } from '../(data)'

export default async function parseSaveFile(
  prevState: any,
  formData: FormData,
): Promise<{ saveFileDiscoveredItemIds: string[] | null; error?: string }> {
  const saveFile = formData.get('saveFile') as File | null
  if (!saveFile) {
    throw new Error('No file provided')
  }
  if (saveFile.name !== 'profile.sav') {
    const message = 'Invalid file name, should be profile.sav'
    console.error(message)
    return {
      saveFileDiscoveredItemIds: null,
      error: message,
    }
  }

  const fileSizeInBytes = saveFile.size
  const fileSizeInKilobytes = fileSizeInBytes / 1000.0

  if (fileSizeInKilobytes > 100) {
    console.error('File too large', fileSizeInKilobytes)
    return {
      saveFileDiscoveredItemIds: null,
      error: `File too large (${fileSizeInKilobytes} KB), please use a smaller file. If you think this is in error, please use the bug report icon in the bottom right to let me know.`,
    }
  }

  const buffer = await saveFile.arrayBuffer()
  try {
    const convertedSave = decompressSave(Buffer.from(buffer))
      .toString()
      .toLowerCase()

    // Get the saveFileDiscoveredItemIds
    const saveFileDiscoveredItemIds = remnantItems
      // Match all item names against info in the save file
      .filter((item) => {
        const name = item.name.replace(/[^a-zA-Z]/g, '').toLowerCase()
        // If the item has a save file slug, use that, otherwise use the name
        return (
          (item.saveFileSlug && convertedSave?.includes(item.saveFileSlug)) ||
          convertedSave?.includes(name)
        )
      })
      // Get just the item ids
      .map((item) => item.id)

    // const responseSize = Buffer.byteLength(
    //   JSON.stringify(saveFileDiscoveredItemIds),
    //   'utf-8',
    // )
    // console.info('FINAL Response', responseSize)

    return {
      saveFileDiscoveredItemIds,
    }
  } catch (e) {
    console.error('Error in parseSaveFile', e)
    return {
      saveFileDiscoveredItemIds: null,
      error: `Unknown error parsing save file`,
    }
  }
}

function readChunkHeader(buffer: Buffer) {
  return {
    unknown: buffer.readBigUInt64LE(0),
    unknown2: buffer.readBigUInt64LE(8),
    unknown3: buffer.readUInt8(16),
    CompressedSize1: buffer.readBigUInt64LE(17),
    DecompressedSize1: buffer.readBigUInt64LE(25),
    CompressedSize2: buffer.readBigUInt64LE(33),
    DecompressedSize2: buffer.readBigUInt64LE(41),
  }
}

function decompressSave(fileBuffer: any) {
  const memstream = []
  let offset = 0xc

  while (offset < fileBuffer.length) {
    const headerBuffer = fileBuffer.slice(offset, offset + 49) // Adjust the length accordingly
    const header = readChunkHeader(headerBuffer)

    const compressedData = fileBuffer.slice(
      offset + 49,
      offset + 49 + Number(header.CompressedSize1),
    )
    const decompressedData = zlib.inflateSync(compressedData)

    memstream.push(decompressedData)
    offset += 49 + Number(header.CompressedSize1)
  }

  return Buffer.concat(memstream)
}
