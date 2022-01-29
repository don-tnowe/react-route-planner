import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faArrowsAltH, faArrowsAltV, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { PointDistances } from './PointDistances.js';

const icons = [
  faMapMarkerAlt,
  faArrowsAltH,
  faArrowsAltV,
  faExpandAlt,
]

const defaultLines = ['...', '...', '...']

export const MapPointInfo = ({ methods }) => {
  const [addressLines, setAddressLines] = useState(defaultLines);
  const [point, setPoint] = useState({ color: '#fff', latlng: { lat: 0, lng: 0 } });

  methods.displayInfoOf = (pts, idx) => {
    setAddressLines(defaultLines);
    setPoint(pts[idx]);
    fetchAddress(pts, idx);
  };

  const fetchAddress = (pts, idx) => (
    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2' +
      '&lat=' + point.latlng.lat +
      '&lon=' + point.latlng.lng
    )
      .then(response => response.json())
      .then(data => {
        setAddressLines([
          (data.address.house_number || '') +
          ' ' + (data.address.road || data.name),
          ' ' + data.lat,
          ' ' + data.lon,
          <PointDistances pts={pts} idx={idx} />,
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