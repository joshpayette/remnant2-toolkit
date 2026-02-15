import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';

export function StatsIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChartSimple} />;
}
