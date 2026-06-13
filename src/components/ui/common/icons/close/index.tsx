import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CloseIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faXmark} />;
}
