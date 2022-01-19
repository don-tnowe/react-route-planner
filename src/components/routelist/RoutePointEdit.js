import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

export const RoutePointEdit = ({ point, onChange, onMouseLeave, onDelete }) => (
  <div
    className='route-point-edit'
    onMouseLeave={onMouseLeave}
  >
    <FontAwesomeIcon icon={faArrowsAlt} color={point.color} />
    <input
      type='text'
      defaultValue={point.name}
      onChange={x => onChange(x.target.value)}
      onKeyDown={x => {
        if (x.key == 'Enter') {
          onMouseLeave();
        }
      }}
    />
    <FontAwesomeIcon
      icon={faTrash}
      color='#000'
      onClick={onDelete}

    />
  </div>
)