import * as React from 'react';

export interface NavItem {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}
