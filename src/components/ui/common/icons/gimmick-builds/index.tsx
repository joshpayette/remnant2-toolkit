import { faBomb } from '@fortawesome/free-solid-svg-icons/faBomb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function GimmickBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBomb} />;
}
