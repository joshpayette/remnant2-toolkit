import { type ErrorResponse } from '@/app/_types/error-response';
import { type SuccessResponse } from '@/app/(builds)/_types/success-response';

export type BuildActionResponse = ErrorResponse | SuccessResponse;
