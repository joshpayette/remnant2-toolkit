import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons/faArrowDownShortWide';

export function SortIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowDownShortWide} />;
}
