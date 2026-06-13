import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ShareIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faShareAlt} />;
}
