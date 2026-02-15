import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';

export function RandomIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faDice} />;
}
