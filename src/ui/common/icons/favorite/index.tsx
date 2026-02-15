import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';

export function FavoriteIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faStar} />;
}
