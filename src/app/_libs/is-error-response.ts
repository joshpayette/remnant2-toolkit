import { type ErrorResponse } from '@/app/_types/error-response';

// type guard for ErrorResponse
export function isErrorResponse(response: unknown): response is ErrorResponse {
  return (response as ErrorResponse).errors !== undefined;
}
