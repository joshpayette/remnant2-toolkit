import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BugIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBug} />;
}
