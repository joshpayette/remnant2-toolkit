import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons/faCircleDot';

export function OptionalOffIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleDot} />;
}
