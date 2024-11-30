import { NavItem } from './nav-item';
export interface ToolkitConfig {
  NAV_ITEMS: Record<string, NavItem>;
  SITE_TITLE: string;
  SITE_DESCRIPTION: string;
  URL_CHANGELOG: string | undefined;
  URL_DISCORD_INVITE: string | undefined;
  URL_IMAGE_BASE: string;
  USER_DEFAULT_BIO: string;
  USER_MAX_BIO_LENGTH: number;
}
