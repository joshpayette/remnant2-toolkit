import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CommunityBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faPeopleGroup} />;
}
