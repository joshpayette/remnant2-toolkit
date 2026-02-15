import { permanentRedirect } from 'next/navigation';

export default async function Page({
  params: { itemName },
}: {
  params: { itemName: string };
}) {
  permanentRedirect(`/i/${itemName}`);
}
