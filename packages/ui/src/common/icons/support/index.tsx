import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons/faHandHoldingHeart';

export function SupportIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faHandHoldingHeart} />;
}
