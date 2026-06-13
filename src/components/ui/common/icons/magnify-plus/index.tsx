import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MagnifyPlusIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faMagnifyingGlassPlus} />;
}
