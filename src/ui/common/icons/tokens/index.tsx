import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';

export function TokensIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCoins} />;
}
