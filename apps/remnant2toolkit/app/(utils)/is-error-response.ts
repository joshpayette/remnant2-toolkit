import { ErrorResponse } from '@/app/(types)/error-response'

// type guard for ErrorResponse
export function isErrorResponse(response: unknown): response is ErrorResponse {
  return (response as ErrorResponse).errors !== undefined
}
