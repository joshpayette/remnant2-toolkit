import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpDown } from '@fortawesome/free-solid-svg-icons/faUpDown';

export function ArrowUpDownIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faUpDown} />;
}
