import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';

export function ResourcesIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faLayerGroup} />;
}
