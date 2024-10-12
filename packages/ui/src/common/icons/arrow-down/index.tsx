import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';

export function ArrowDownIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowDown} />;
}
