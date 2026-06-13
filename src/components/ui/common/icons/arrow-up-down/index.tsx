import { faUpDown } from '@fortawesome/free-solid-svg-icons/faUpDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArrowUpDownIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faUpDown} />;
}
