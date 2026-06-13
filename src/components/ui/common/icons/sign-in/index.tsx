import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SignInIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSignInAlt} />;
}
