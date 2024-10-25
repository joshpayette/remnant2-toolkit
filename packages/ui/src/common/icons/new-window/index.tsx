import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons/faWindowMaximize';

export function NewWindowIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faWindowMaximize} />;
}
