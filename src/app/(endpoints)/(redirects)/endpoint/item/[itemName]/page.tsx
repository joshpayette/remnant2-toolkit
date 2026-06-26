import { permanentRedirect } from 'next/navigation';

export default async function Page(
  props: {
    params: Promise<{ itemName: string }>;
  }
) {
  const params = await props.params;

  const {
    itemName
  } = params;

  permanentRedirect(`/i/${itemName}`);
}
