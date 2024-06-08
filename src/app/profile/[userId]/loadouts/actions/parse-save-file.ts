'use server'

import {
  MAX_PROFILE_SAV_SIZE,
  type ParsedLoadoutItem,
} from '@/app/(types)/sav-file'
import { validateEnv } from '@/app/(validators)/validate-env'

const env = validateEnv()

type ParsedLoadoutResponse = Array<ParsedLoadoutItem>

/**
 * Parse the data from the Remnant 2 save file
 */
export async function parseSaveFile(
  prevState: any,
  formData: FormData,
): Promise<{ loadouts: ParsedLoadoutResponse[] | null; error?: string }> {
  const saveFile = formData.get('saveFile') as File | null
  if (!saveFile) {
    throw new Error('No file provided')
  }
  if (saveFile.name.toLowerCase() !== 'profile.sav') {
    const message = 'Invalid file name, should be profile.sav'
    console.error(message)
    return {
      loadouts: null,
      error: message,
    }
  }

  // if characterSlot is missing from form data, add it
  if (!formData.has('characterSlot')) {
    formData.append('characterSlot', '1')
  }

  const fileSizeInBytes = saveFile.size
  const fileSizeInKilobytes = fileSizeInBytes / 1000.0

  if (fileSizeInKilobytes > MAX_PROFILE_SAV_SIZE) {
    console.error('File too large', fileSizeInKilobytes)
    return {
      loadouts: null,
      error: `File too large (${fileSizeInKilobytes} KB), please use a smaller file. If you think this is in error, please use the bug report icon in the bottom right to let me know.`,
    }
  }

  try {
    formData.append('authToken', env.LOADOUT_AUTH_TOKEN)

    // Send the file the loadout parser
    const response = await fetch(`${env.LOADOUT_PARSER_URL}/ExportLoadout`, {
      method: 'POST',
      // headers
      headers: {
        Accept: 'application/octet-stream',
      },
      body: formData,
    })

    if (!response.ok) {
      console.error('Error in parseSaveFile', response)
      return {
        loadouts: null,
        error: `Error parsing save file`,
      }
    }

    const data = await response.json()
    if (!data[0]?.loadouts) {
      return {
        loadouts: null,
        error: `No loadouts found in save file for character slot ${formData.get(
          'characterSlot',
        )}`,
      }
    }

    const loadouts = (data[0]?.loadouts as ParsedLoadoutResponse[]).filter(
      (loadout) => loadout !== null && loadout.length > 0,
    )

    return {
      loadouts,
    }
  } catch (e) {
    console.error('Error in parseSaveFile', e)
    return {
      loadouts: null,
      error: `Unknown error parsing save file`,
    }
  }
}
