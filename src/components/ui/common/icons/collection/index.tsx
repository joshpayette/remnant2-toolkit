import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CollectionIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faLayerGroup} />;
}
