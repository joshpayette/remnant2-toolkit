import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears';

export function ModdingIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faGears} />;
}
