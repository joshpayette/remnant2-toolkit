import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

export function ChevronDownIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronDown} />;
}
