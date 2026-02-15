import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaterLadder } from '@fortawesome/free-solid-svg-icons/faWaterLadder';

export function BeginnerBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faWaterLadder} />;
}
