import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SettingsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faGear} />;
}
