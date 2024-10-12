import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons/faBoxArchive';

export function WorldSaveIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBoxArchive} />;
}
