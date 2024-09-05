import { permanentRedirect } from 'next/navigation';

export default async function Page({
  params: { tagName },
}: {
  params: { tagName: string };
}) {
  permanentRedirect(`/t/${tagName}`);
}
