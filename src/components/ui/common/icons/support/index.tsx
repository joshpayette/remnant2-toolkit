import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons/faHandHoldingHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SupportIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faHandHoldingHeart} />;
}
