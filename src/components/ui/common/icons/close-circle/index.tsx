import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CloseCircleIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleXmark} />;
}
