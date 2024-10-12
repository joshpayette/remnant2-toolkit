import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons/faFileArrowDown';

export function DownloadIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faFileArrowDown} />;
}
