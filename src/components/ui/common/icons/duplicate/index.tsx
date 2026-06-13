import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DuplicateIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faClone} />;
}
