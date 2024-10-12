import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';

export function DiscordIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faDiscord} />;
}
