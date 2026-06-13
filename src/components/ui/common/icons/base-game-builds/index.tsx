import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BaseGameBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCubes} />;
}
