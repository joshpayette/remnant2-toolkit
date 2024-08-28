import { unstable_flag as flag } from '@vercel/flags/next';

export const showNotificationsFlag = flag({
  key: 'showNotificaitons',
  decide: () => process.env.SHOW_NOTIFICATIONS === 'true',
});
