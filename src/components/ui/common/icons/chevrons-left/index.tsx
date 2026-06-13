import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChevronsLeftIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faAnglesLeft} />;
}
