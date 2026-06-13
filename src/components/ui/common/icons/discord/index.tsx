import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DiscordIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faDiscord} />;
}
