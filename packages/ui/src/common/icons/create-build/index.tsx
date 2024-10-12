import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons/faScrewdriverWrench';

export function CreateBuildIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faScrewdriverWrench} />;
}
