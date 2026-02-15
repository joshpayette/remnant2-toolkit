import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';

export function XIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faX} />;
}
