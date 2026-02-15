import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faUpRightFromSquare';

export function NewWindowIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faUpRightFromSquare} />;
}
