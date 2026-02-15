import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';

export function CloseCircleIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleXmark} />;
}
