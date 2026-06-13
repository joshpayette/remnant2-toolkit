import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons/faArrowRightLong';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function IndentIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowRightLong} />;
}
