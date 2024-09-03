import { type RELEASE_TO_NAME } from '@/app/_constants/releases';

export type ReleaseKey = keyof typeof RELEASE_TO_NAME;
export type ReleaseName = (typeof RELEASE_TO_NAME)[ReleaseKey];
