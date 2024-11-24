import type { Metadata } from 'next';

import { CONFIG } from '@/src/app/config';

export const metadata: Metadata = {
  title: CONFIG.site.title,
  description: CONFIG.site.description,
};
