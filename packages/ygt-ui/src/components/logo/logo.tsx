import { CONFIG } from '@ygt/toolkits/configs/yourgamingtoolkit';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sharedProps = {
  alt: `${CONFIG.SITE_TITLE} Logo`,
};

export function Logo({ size = 'sm' }: LogoProps) {
  switch (size) {
    case 'xs':
      return (
        <img
          {...sharedProps}
          alt={sharedProps.alt}
          height="105"
          src={`${CONFIG.URL_IMAGE_BASE}/general/logo-xs.png`}
          width="60"
        />
      );
    case 'sm':
      return (
        <img
          {...sharedProps}
          alt={sharedProps.alt}
          height="100"
          src={`${CONFIG.URL_IMAGE_BASE}/general/logo-sm.png`}
          width="175"
        />
      );
    case 'md':
      return (
        <img
          {...sharedProps}
          alt={sharedProps.alt}
          height="200"
          src={`${CONFIG.URL_IMAGE_BASE}/general/logo-md.png`}
          width="350"
        />
      );
    case 'lg':
      return (
        <img
          {...sharedProps}
          alt={sharedProps.alt}
          height="400"
          src={`${CONFIG.URL_IMAGE_BASE}/general/logo-lg.png`}
          width="700"
        />
      );
    case 'xl':
      return (
        <img
          {...sharedProps}
          alt={sharedProps.alt}
          height="546"
          src={`${CONFIG.URL_IMAGE_BASE}/general/logo-xl.png`}
          width="955"
        />
      );
  }
}
