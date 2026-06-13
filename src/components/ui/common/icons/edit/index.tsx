import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function EditIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEdit} />;
}
