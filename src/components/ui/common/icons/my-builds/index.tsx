import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MyBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSitemap} />;
}
