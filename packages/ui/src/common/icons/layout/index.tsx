import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons/faTableColumns';

export function LayoutIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faTableColumns} />;
}
