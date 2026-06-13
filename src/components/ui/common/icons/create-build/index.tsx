import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons/faScrewdriverWrench';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CreateBuildIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faScrewdriverWrench} />;
}
