import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';

export function CommunityBuildsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faPeopleGroup} />;
}
