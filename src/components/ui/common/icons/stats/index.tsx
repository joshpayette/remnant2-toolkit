import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function StatsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChartSimple} />;
}
