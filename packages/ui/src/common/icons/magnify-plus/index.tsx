import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';

export function MagnifyPlusIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faMagnifyingGlassPlus} />;
}
