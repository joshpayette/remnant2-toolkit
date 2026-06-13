import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassMinus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MagnifyMinusIcon({ className }: { className?: string }) {
  return (
    <FontAwesomeIcon className={className} icon={faMagnifyingGlassMinus} />
  );
}
