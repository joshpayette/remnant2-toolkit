import { faPaintbrush } from '@fortawesome/free-solid-svg-icons/faPaintbrush';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ThemeIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faPaintbrush} />;
}
