import { faSlash } from '@fortawesome/free-solid-svg-icons/faSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SlashIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSlash} />;
}
