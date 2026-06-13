import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function OwnershipIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBagShopping} />;
}
