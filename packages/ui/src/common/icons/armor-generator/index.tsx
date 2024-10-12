import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons/faShield';

export function ArmorGeneratorIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faShield} />;
}
