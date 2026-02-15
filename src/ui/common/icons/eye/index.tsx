import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';

export function EyeIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEye} />;
}
