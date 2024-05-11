import { BUILD_TAG } from '@prisma/client'

export type BuildTag = {
  label: string
  value: BUILD_TAG
  colors: {
    bg: string
    hover: string
    text: string
  }
}
