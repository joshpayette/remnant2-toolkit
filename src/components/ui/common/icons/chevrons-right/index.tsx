import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChevronsRightIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faAnglesRight} />;
}
