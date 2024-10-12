import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandFist } from '@fortawesome/free-solid-svg-icons/faHandFist';

export function HardcoreIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faHandFist} />;
}
