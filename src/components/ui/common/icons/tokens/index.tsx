import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function TokensIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCoins} />;
}
