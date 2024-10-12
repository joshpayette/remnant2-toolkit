import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping';

export function OwnershipIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBagShopping} />;
}
