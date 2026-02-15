import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons/faIdCard';

export function ProfileIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faIdCard} />;
}
