import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassChart';

export function ItemLookupIcon({ className }: { className?: string }) {
  return (
    <FontAwesomeIcon className={className} icon={faMagnifyingGlassChart} />
  );
}
