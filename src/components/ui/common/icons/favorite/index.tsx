import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FavoriteIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faStar} />;
}
