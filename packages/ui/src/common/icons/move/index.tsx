import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons/faBarsStaggered';

export function MoveIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBarsStaggered} />;
}
