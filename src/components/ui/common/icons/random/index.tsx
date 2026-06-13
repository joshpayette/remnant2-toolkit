import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function RandomIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faDice} />;
}
