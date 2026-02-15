import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons/faClipboardQuestion';

export function FAQIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faClipboardQuestion} />;
}
