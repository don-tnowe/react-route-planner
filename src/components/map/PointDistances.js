import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faFlag } from '@fortawesome/free-solid-svg-icons';

const calculateDistance = (pt1, pt2) => {
  const R = 6371e3; // metres
  const lat1 = pt1.latlng.lat * Math.PI / 180;
  const lat2 = pt2.latlng.lat * Math.PI / 180;
  const diff_lat = (pt2.latlng.lat - pt1.latlng.lat) * Math.PI / 180;
  const diff_lng = (pt2.latlng.lng - pt1.latlng.lng) * Math.PI / 180;

  const a = Math.sin(diff_lat / 2) * Math.sin(diff_lat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(diff_lng / 2) * Math.sin(diff_lng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}

const calculatePathLength = (pts, first = 0, last = -1) => {
  let length = 0;
  if (last < 0) last += pts.length;

  for (let i = first + 1; i <= last; i++) {
    length += calculateDistance(pts[i - 1], pts[i]);
  }
  return length;
}

export const PointDistances = ({pts, idx}) => <div className='map-point-dists'>
  {idx > 1 ?
    <div>
      <div className='info-icon'>
        <FontAwesomeIcon icon={faFlag} color={pts[0].color} />
      </div>
      {
        pts[0].name + ': ' +
        Math.ceil(calculatePathLength(pts, 0, idx))
        + 'm'
      }</div> :
    null}
  {idx > 0 ?
    <div>
      <div className='info-icon'>
        <FontAwesomeIcon icon={faMapMarker} color={pts[idx - 1].color} />
      </div>
      {
        pts[idx - 1].name + ': ' +
        Math.ceil(calculateDistance(pts[idx - 1], pts[idx]))
        + 'm'
      }</div> :
    null}
  {idx < pts.length - 1 ?
    <div>
      <div className='info-icon'>
        <FontAwesomeIcon icon={faMapMarker} color={pts[idx + 1].color} />
      </div>
      {
        pts[idx + 1].name + ': ' +
        Math.ceil(calculateDistance(pts[idx], pts[idx + 1]))
        + 'm'
      }</div> :
    null}
  {idx < pts.length - 2 ?
    <div>
      <div className='info-icon'>
        <FontAwesomeIcon icon={faFlag} color={pts[pts.length - 1].color} />
      </div>
      {
        pts[pts.length - 1].name + ': ' +
        Math.ceil(calculatePathLength(pts, idx, pts.length - 1))
        + 'm'
      }</div> :
    null}
</div>