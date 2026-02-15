import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons/faShirt';

export function LoadoutIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faShirt} />;
}
