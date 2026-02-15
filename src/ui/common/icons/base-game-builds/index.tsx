import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';

export function BaseGameBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCubes} />;
}
