import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import './MapWrapper.css';

let dragging = -1;

export function MapWrapper({ methods }) {
  const [points, setPoints] = useState([]);
  const [mapRef, setMapRef] = useState();
  const [markerDragging, setMarkerDragging] = useState(-1);

  const handleMouseDown = idx => {
    setMarkerDragging(idx);
    dragging = idx;
    console.log('down on: '+idx);
    mapRef.dragging.disable();
  }
  const handleMouseUp = map => {
    setMarkerDragging(-1);
    dragging = -1;
    console.log('гз on: '+markerDragging);
    map.dragging.enable();
  }
  const handleDrag = e => {
    console.log(points);
    console.log(dragging);
    if (dragging != -1)
      points[dragging].latlng = e.latlng;
  }

  return (
    <div className='map-container'>
      <MapContainer
        center={[0, 0]}
        zoom={1}
        scrollWheelZoom={true}
        whenCreated={map => {
          setMapRef(map);
          // methods.setPoints = (x) => { setPoints(x); map.invalidateSize(); };
          methods.setPoints = p => {setPoints(p)};
          // TODO Doesn't update on delete even tho function's called
          methods.getMapCenter = () => map.getCenter();
          map.on('mouseup', () => handleMouseUp(map));
          map.on('mousemove', e => handleDrag(e));
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {points.map((x, i) => (
          <CircleMarker
            key={i}
            center={x.latlng}
            pathOptions={{ color: x.color }}
            eventHandlers={{
              mousedown: () => handleMouseDown(i)
            }}
          >
            <Popup>{x.name + ' ( id ' + i + ')'}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}