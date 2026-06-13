import { faTableColumns } from '@fortawesome/free-solid-svg-icons/faTableColumns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function LayoutIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faTableColumns} />;
}
