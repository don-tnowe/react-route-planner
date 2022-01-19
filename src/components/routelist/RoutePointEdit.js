import { faTrash, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../IconButton.js';

export const RoutePointEdit = ({ point, onChange, onMouseLeave, onDelete }) => (
  <div
    className='route-point-edit'
    onMouseLeave={onMouseLeave}
  >
    <IconButton
      icon={faArrowsAlt}
      color={point.color}
    />
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
    <IconButton
      icon={faTrash}
      color='#d00'
      onClick={onDelete}
    />
  </div>
)