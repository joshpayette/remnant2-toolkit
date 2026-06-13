import { faShield } from '@fortawesome/free-solid-svg-icons/faShield';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArmorGeneratorIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faShield} />;
}
