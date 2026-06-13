import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChangeLogIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBook} />;
}
