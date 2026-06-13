import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArrowLeftIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowLeft} />;
}
