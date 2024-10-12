import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';

export function DuplicateIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faClone} />;
}
