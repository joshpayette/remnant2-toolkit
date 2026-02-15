import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';

export function FilterIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faFilter} />;
}
