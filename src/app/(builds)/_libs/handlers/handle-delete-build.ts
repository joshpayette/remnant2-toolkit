import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { deleteBuild } from '@/app/(builds)/_actions/delete-build';

export async function handleDeleteBuild({
  buildId,
  onDelete,
}: {
  buildId: string;
  onDelete?: (buildId: string) => void;
}) {
  const response = await deleteBuild(buildId);

  if (isErrorResponse(response)) {
    console.error(response.errors);
    toast.error('Error deleting build. Please try again later.');
  } else {
    toast.success(response.message);
    if (onDelete) onDelete(buildId);
  }
}
