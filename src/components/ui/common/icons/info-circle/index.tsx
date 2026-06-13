import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function InfoCircleIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faCircleInfo} />;
}
