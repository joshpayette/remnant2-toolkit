import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons/faBomb';

export function GimmickBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBomb} />;
}
