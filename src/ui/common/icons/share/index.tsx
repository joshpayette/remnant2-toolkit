import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';

export function ShareIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faShareAlt} />;
}
