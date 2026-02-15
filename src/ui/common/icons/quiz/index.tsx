import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';

export function QuizIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faEnvelopeOpenText} />;
}
