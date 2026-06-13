import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SquareIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSquare} />;
}
