import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';

export function OptionalOnIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faToggleOn} />;
}
