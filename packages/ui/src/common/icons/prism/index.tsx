import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons/faGem';

export function PrismIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faGem} />;
}
