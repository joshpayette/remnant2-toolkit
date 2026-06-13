import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons/faArrowDownShortWide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SortIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowDownShortWide} />;
}
