'use client';

import { BaseInput } from '@repo/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { Submit } from '@/app/(items)/item-lookup-v2/_components/submit';

const schema = z.object({
  searchText: z
    .string({
      invalid_type_error: 'Invalid search text.',
    })
    .nullable(),
});

export function FilterForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const parse = schema.parse({
    searchText: searchParams.get('searchText'),
  });

  const searchText = parse.searchText;

  function applyFilters(formData: FormData) {
    const params = new URLSearchParams(searchParams);

    const parse = schema.safeParse({
      searchText: formData.get('searchText'),
    });

    if (!parse.success) {
      return {
        message: 'Failed to parse form filters.',
      };
    }
    const data = parse.data;
    params.set('searchText', data.searchText);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form action={applyFilters}>
      <BaseInput name="searchText" defaultValue={searchText} />
      <Submit />
    </form>
  );
}
