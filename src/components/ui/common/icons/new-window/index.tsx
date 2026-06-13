import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faUpRightFromSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function NewWindowIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faUpRightFromSquare} />;
}
