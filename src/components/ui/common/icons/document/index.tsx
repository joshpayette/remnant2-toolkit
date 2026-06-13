import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DocumentIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faFileLines} />;
}
