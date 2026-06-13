import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function EyeOffIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEyeSlash} />;
}
