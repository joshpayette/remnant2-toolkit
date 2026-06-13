import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PaperClipIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faPaperclip} />;
}
