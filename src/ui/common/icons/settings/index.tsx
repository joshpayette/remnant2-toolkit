import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';

export function SettingsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faGear} />;
}
