import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function EyeIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEye} />;
}
