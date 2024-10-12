import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

export function VideoIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faVideo} />;
}
