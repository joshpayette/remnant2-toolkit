import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

export function EditIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEdit} />;
}
