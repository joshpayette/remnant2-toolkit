import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';

export function BugIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBug} />;
}
