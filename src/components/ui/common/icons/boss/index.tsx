import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons/faSkullCrossbones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BossIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSkullCrossbones} />;
}
