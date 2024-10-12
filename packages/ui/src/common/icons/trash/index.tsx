import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

export function TrashIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faTrash} />;
}
