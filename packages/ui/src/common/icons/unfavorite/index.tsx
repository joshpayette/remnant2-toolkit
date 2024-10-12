import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';

export function UnfavoriteIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faStar} />;
}
