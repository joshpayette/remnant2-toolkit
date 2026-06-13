import { faGears } from '@fortawesome/free-solid-svg-icons/faGears';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ModdingIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faGears} />;
}
