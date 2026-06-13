import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FilterIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faFilter} />;
}
