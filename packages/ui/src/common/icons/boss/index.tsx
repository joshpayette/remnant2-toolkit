import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons/faSkullCrossbones';

export function BossIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSkullCrossbones} />;
}
