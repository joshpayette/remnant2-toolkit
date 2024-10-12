import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

export function CloseIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faXmark} />;
}
