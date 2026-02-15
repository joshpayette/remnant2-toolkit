import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';

export function PaperClipIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faPaperclip} />;
}
