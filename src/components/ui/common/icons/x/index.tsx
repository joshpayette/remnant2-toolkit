import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function XIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faX} />;
}
