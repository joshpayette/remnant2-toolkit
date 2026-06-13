import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function VideoIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faVideo} />;
}
