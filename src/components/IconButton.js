import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hexRgb from 'hex-rgb';

export const IconButton = ({ color, icon, onClick }) => {
  const { red, green, blue } = hexRgb(color);
  return (
    <div
      className='icon-button'
      onClick={onClick}
      style={{
        backgroundColor: color,
        boxShadow: '0 0 5px 0px ' + color,
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        color={(red * 0.299 + green * 0.587 + blue * 0.114 < 160.0) ? '#fff' : '#333'}
        style={{
        }}
      />
    </div>
  )
}