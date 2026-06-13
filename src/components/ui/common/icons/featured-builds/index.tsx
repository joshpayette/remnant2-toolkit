import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FeaturedBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faLightbulb} />;
}
