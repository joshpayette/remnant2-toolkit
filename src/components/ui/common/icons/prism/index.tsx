import { faGem } from '@fortawesome/free-solid-svg-icons/faGem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PrismIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faGem} />;
}
