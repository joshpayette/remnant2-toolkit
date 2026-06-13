import { faHandFist } from '@fortawesome/free-solid-svg-icons/faHandFist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function HardcoreIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faHandFist} />;
}
