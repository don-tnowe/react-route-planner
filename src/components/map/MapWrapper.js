import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet'
import './MapWrapper.css';

export const MapWrapper = ({ methods }) => {
  const [points, setPoints] = useState([]);
  const [dragging, setDragging] = useState(-1);
  const [mapRef, setMapRef] = useState();
  const [addressLines, setAddressLines] = useState(['', '', '']);
  const [updateCount, setUpdateCount] = useState(0);

  const addressRef = useRef();

  const fetchAddress = idx => (
    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2' +
      '&lat=' + points[idx].latlng.lat +
      '&lon=' + points[idx].latlng.lng
    )
      .then(response => response.json())
      .then(data => {
        setAddressLines([
          (data.address.house_number || '') +
          ' ' + (data.address.road || ''),
          'lat. ' + data.lat,
          'long. ' + data.lon,
        ]);
      }));
      
  const handleMouseDown = idx => {
    setDragging(idx);
    mapRef.dragging.disable();
  }

  const handleMouseUp = () => {
    if (dragging !== -1) {
      fetchAddress(dragging);
    }
    setDragging(-1);
    mapRef.dragging.enable();
  }

  const handleDrag = e => {
    if (dragging !== -1) {
      points[dragging].latlng = e.latlng;
    }
  }

  if (mapRef) {
    // Events are connected here instead of whenCreated 
    // because functions would remember old use states.
    mapRef.off('mouseup mousemove');
    mapRef.on('mouseup', () => handleMouseUp());
    mapRef.on('mousemove', e => handleDrag(e));
    methods.update = () => setUpdateCount(updateCount + 1);
    methods.displayAddressOf = idx => fetchAddress(idx);
  }
  return (
    <div className='map-container'>
      <MapContainer
        center={[0, 0]}
        zoom={1}
        scrollWheelZoom={true}
        whenCreated={map => {
          setMapRef(map);
          methods.setPoints = p => setPoints(p);
          methods.getMapCenter = () => map.getCenter();
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {points.map((x, i) => (
          <CircleMarker
            key={x.key}
            center={x.latlng}
            pathOptions={{ color: x.color }}
            eventHandlers={{
              mousedown: () => handleMouseDown(i)
            }}
          >
            <Popup>{x.name + ' ( id ' + i + ')'}</Popup>
          </CircleMarker>
        ))}
        <Polyline
          positions={points.map(x => x.latlng)}
          pathOptions={{ color: points.length > 0 ? points[0].color : undefined }}
        ></Polyline>
      </MapContainer>
      <div id='map-address' ref={addressRef}>
        {addressLines.map((x, i) => (
          <div key={i}>{x}</div>
        ))}
      </div>
    </div>
  )
}