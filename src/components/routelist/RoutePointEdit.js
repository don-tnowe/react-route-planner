import { faTrash, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../IconButton.js';

export const RoutePointEdit = ({ point, onChange, onDelete, onDrag }) => (
  <div className='route-point-edit' onMouseUp={() => onDrag(false)}>
    <IconButton
      icon={faArrowsAlt}
      color={point.color}
      onClick={() => onDrag(true)}
    />
    <input
      type='text'
      defaultValue={point.name}
      onChange={x => onChange(x.target.value)}
    />
    <IconButton
      icon={faTrash}
      color='#d00'
      onClick={onDelete}
    />
  </div>
)