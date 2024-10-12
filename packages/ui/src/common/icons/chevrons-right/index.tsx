import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';

export function ChevronsRightIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faAnglesRight} />;
}
