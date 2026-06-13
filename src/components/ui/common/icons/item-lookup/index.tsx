import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ItemLookupIcon({ className }: { className?: string }) {
  return (
    <FontAwesomeIcon className={className} icon={faMagnifyingGlassChart} />
  );
}
