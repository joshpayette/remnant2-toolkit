'use server';

import { getQualityBuildFeed } from '../_actions/get-quality-build-feed';
import { QualityBuildFeed } from './quality-build-feed';

export async function QualityBuildFeedContainer() {
  const response = await getQualityBuildFeed();
  return <QualityBuildFeed builds={response.builds} />;
}
