import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

export function SignOutIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSignOutAlt} />;
}
