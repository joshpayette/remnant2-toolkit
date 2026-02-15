import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons/faSlash';

export function SlashIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSlash} />;
}
