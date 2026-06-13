import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons/faBarsStaggered';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MoveIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBarsStaggered} />;
}
