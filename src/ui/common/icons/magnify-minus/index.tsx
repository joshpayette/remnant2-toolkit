import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassMinus';

export function MagnifyMinusIcon({ className }: { className?: string }) {
  return (
    <FontAwesomeIcon className={className} icon={faMagnifyingGlassMinus} />
  );
}
