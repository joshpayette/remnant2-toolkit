import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';

export function MyBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faSitemap} />;
}
