import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

export function ArrowLeftIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowLeft} />;
}
