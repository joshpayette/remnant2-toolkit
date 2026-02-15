import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons/faArrowRightLong';

export function IndentIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowRightLong} />;
}
