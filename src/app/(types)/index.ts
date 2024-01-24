/**
 * The information provided by the metadata for
 * each featured-build page
 */
export interface PageInfo {
  title: string
  creator?: string | string[]
  description: string
  slug: string
  url: string
  ogImageUrl: string
  classes?: string[]
  tags?: string[]
}

export type Archtype =
  | 'alchemist'
  | 'archon'
  | 'challenger'
  | 'engineer'
  | 'explorer'
  | 'gunslinger'
  | 'handler'
  | 'hunter'
  | 'invader'
  | 'medic'
  | 'ritualist'
  | 'summoner'

export type ErrorResponse = {
  errors?: any[]
}
// type guard for ErrorResponse
export function isErrorResponse(response: any): response is ErrorResponse {
  return (response as ErrorResponse).errors !== undefined
}
