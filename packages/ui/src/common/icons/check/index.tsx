import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

export function CheckIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCheck} />;
}
