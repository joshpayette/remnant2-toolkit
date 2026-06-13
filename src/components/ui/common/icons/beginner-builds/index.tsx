import { faWaterLadder } from '@fortawesome/free-solid-svg-icons/faWaterLadder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BeginnerBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faWaterLadder} />;
}
