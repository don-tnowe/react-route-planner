import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

const icons = [
  faMapMarkerAlt,
  faArrowsAltH,
  faArrowsAltV,
]

const defaultLines = ['...', '...', '...']

export const MapPointInfo = ({ methods }) => {
  const [addressLines, setAddressLines] = useState(defaultLines);
  const [point, setPoint] = useState({ color: '#000' });

  methods.displayInfoOf = pt => {
    setPoint(pt);
    setAddressLines(defaultLines);
    fetchAddress();
  };

  const fetchAddress = () => (
    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2' +
      '&lat=' + point.latlng.lat +
      '&lon=' + point.latlng.lng
    )
      .then(response => response.json())
      .then(data => {
        setAddressLines([
          (data.address.house_number || '') +
          ' ' + (data.address.road || ''),
          ' ' + data.lat,
          ' ' + data.lon,
        ]);
      }));

  return <div className='map-point-info'>
    {addressLines.map((x, i) => <div key={i}>
      <div className='info-icon'>
        <FontAwesomeIcon icon={icons[i]} color={point.color} />
      </div>
      {x}
    </div>)}
  </div>
}