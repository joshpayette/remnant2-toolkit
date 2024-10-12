import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

export function EyeOffIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEyeSlash} />;
}
