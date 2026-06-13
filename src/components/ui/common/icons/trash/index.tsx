import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function TrashIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faTrash} />;
}
