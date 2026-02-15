import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';

export function QuestionIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faQuestion} />;
}
