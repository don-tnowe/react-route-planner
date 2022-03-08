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
let fetchingIdx = -1;

export const MapPointInfo = ({ methods }) => {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(defaultLines);
  const [point, setPoint] = useState({ color: '#fff', latlng: { lat: 0, lng: 0 } });

  methods.displayInfoOf = (pts, idx) => {
    setPoint(pts[idx]);
    fetchAddress(pts, idx);
  };

  const fetchAddress = (pts, idx) => {
    fetchingIdx = idx;
    setCoords([
      ' ' + pts[idx].latlng.lat,
      ' ' + pts[idx].latlng.lng,
      <PointDistances pts={pts} idx={idx} />,
    ]);
    setAddress('...');
    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2' +
      '&lat=' + pts[idx].latlng.lat +
      '&lon=' + pts[idx].latlng.lng
    )
      .then(response => response.json())
      .then(data => {
        if (idx === fetchingIdx)
          setAddress(
            (data.address.house_number || '')
            + ' '
            + (data.address.road || data.name)
          );
      });
  };

  return <div className='map-point-info'>
    <div>
      <div className='info-icon'>
        <FontAwesomeIcon icon={icons[0]} color={point.color} />
      </div>
      {address || '...'}
    </div>
    {
      coords.map((x, i) => <div key={i}>
        <div className='info-icon'>
          <FontAwesomeIcon icon={icons[i + 1]} color={point.color} />
        </div>
        {x}
      </div>)
    }
  </div>
}