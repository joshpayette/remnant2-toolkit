import { faCircleDot } from '@fortawesome/free-regular-svg-icons/faCircleDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function OptionalOffIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleDot} />;
}
