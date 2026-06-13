import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SignOutIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSignOutAlt} />;
}
