import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';

export function SignInIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSignInAlt} />;
}
