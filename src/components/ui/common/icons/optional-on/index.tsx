import { faCircleDot } from '@fortawesome/free-solid-svg-icons/faCircleDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function OptionalOnIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleDot} />;
}
