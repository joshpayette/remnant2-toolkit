import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArrowDownIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowDown} />;
}
