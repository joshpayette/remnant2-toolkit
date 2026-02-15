import path from 'node:path';

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma'),
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
