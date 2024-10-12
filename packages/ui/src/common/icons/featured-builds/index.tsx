import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';

export function FeaturedBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faLightbulb} />;
}
