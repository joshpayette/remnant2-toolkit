import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CheckIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCheck} />;
}
