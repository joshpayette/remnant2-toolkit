'use client';

import { BaseButton } from '@repo/ui';
import { usePathname, useRouter } from 'next/navigation';

import { NAV_ITEMS } from '@/app/_types/navigation';

export function RandomBuildButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <BaseButton
      outline
      aria-label={NAV_ITEMS.randomBuild.label}
      onClick={() => {
        // Redirect and reload the page
        if (pathname === NAV_ITEMS.randomBuild.href) {
          window.location.reload();
        } else {
          router.push(NAV_ITEMS.randomBuild.href, {
            scroll: false,
          });
        }
      }}
      className="lg:w-full"
    >
      <NAV_ITEMS.randomBuild.icon className="mr-1 h-4 w-4" /> Random Build
    </BaseButton>
  );
}
