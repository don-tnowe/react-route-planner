import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export const RouteListItem = ({ point, selectCallback }) => (
  <div
    className='route-point'
    onMouseMove={selectCallback}
  >
    <FontAwesomeIcon icon={faMapMarkerAlt} color={point.color} />
    <div>
      {point.name}
    </div>
  </div>
)