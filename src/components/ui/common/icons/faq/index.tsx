import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons/faClipboardQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FAQIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faClipboardQuestion} />;
}
