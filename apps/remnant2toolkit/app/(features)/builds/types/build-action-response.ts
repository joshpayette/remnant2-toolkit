import { SuccessResponse } from '@/app/(features)/builds/types/success-response';
import { ErrorResponse } from '@/app/(types)/error-response';

export type BuildActionResponse = ErrorResponse | SuccessResponse;
