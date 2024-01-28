import { ErrorResponse } from './types'

// type guard for ErrorResponse
export function isErrorResponse(response: any): response is ErrorResponse {
  return (response as ErrorResponse).errors !== undefined
}
