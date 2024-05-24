import { z } from 'zod'

export function validateLinkedBuild(linkedBuild: unknown) {
  const linkedBuildSchema = z.object({
    label: z.string(),
    linkedBuildItems: z
      .array(
        z.object({
          label: z.string(),
          buildId: z.string(),
        }),
      )
      .min(1)
      .max(3),
  })

  return linkedBuildSchema.safeParse(linkedBuild)
}
