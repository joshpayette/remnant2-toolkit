import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';

export function ChangeLogIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBook} />;
}
