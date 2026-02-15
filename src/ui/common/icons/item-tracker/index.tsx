import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck';

export function ItemTrackerIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faListCheck} />;
}
