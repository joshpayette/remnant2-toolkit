import { permanentRedirect } from 'next/navigation';

export default async function Page(
  props: {
    params: Promise<{ tagName: string }>;
  }
) {
  const params = await props.params;

  const {
    tagName
  } = params;

  permanentRedirect(`/t/${tagName}`);
}
