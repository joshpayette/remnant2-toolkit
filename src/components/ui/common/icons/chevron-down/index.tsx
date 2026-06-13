import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChevronDownIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronDown} />;
}
