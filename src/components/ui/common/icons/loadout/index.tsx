import { faShirt } from '@fortawesome/free-solid-svg-icons/faShirt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function LoadoutIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faShirt} />;
}
