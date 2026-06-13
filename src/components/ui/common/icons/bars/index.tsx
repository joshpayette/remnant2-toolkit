import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BarsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBars} />;
}
