import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function QuizIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEnvelopeOpenText} />;
}
