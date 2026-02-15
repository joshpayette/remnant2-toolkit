import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintbrush } from '@fortawesome/free-solid-svg-icons/faPaintbrush';

export function ThemeIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faPaintbrush} />;
}
