import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function UnfavoriteIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faStar} />;
}
