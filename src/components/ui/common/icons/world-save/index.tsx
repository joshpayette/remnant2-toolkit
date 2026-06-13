import { faBoxArchive } from '@fortawesome/free-solid-svg-icons/faBoxArchive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function WorldSaveIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faBoxArchive} />;
}
