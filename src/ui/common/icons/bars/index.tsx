import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

export function BarsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBars} />;
}
