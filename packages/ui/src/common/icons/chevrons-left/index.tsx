import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';

export function ChevronsLeftIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faAnglesLeft} />;
}
