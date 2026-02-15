import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';

export function SquareIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSquare} />;
}
