import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';

export function DocumentIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faFileLines} />;
}
