import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ItemTrackerIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faListCheck} />;
}
