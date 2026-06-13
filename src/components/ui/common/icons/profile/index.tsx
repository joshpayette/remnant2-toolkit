import { faIdCard } from '@fortawesome/free-solid-svg-icons/faIdCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ProfileIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faIdCard} />;
}
