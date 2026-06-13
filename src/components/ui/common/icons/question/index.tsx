import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function QuestionIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faQuestion} />;
}
