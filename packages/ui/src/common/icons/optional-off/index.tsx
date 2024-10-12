import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff';

export function OptionalOffIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faToggleOff} />;
}
