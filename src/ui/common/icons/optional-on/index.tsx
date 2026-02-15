import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons/faCircleDot';

export function OptionalOnIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleDot} />;
}
