import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';

export function InfoCircleIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleInfo} />;
}
