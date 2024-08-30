import { type SuccessResponse } from '@/app/(builds)/_types/success-response';
import { type ErrorResponse } from '@/app/(types)/error-response';

export type BuildActionResponse = ErrorResponse | SuccessResponse;
