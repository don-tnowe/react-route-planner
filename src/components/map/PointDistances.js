import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faFlag } from '@fortawesome/free-solid-svg-icons';
import { calculateDistance, calculatePathLength } from './DistanceCalculation.js';

const getDisplayedData = (idx, pts) => [
  // First
  idx > 1 ? {
    point: pts[0],
    distance: calculatePathLength(pts, 0, idx),
    icon: faFlag,
  } : null,
  // Previous
  idx > 0 ? {
    point: pts[idx - 1],
    distance: calculateDistance(pts[idx - 1], pts[idx]),
    icon: faMapMarker,
  } : null,
  // Next
  idx < pts.length - 1 ? {
    point: pts[idx + 1],
    distance: calculateDistance(pts[idx], pts[idx + 1]),
    icon: faMapMarker,
  } : null,
  // Last
  idx < pts.length - 2 ? {
    point: pts[pts.length - 1],
    distance: calculatePathLength(pts, idx, pts.length - 1),
    icon: faFlag,
  } : null,
]

export const PointDistances = ({ idx, pts }) => (
  <div className='map-point-dists'>
    {
      getDisplayedData(idx, pts).map(
        (x, i) => (
          x ? (
            <div key={i}>
              <div className='info-icon'>
                <FontAwesomeIcon icon={x.icon} color={x.point.color} />
              </div>
              {x.point.name + ': ' + Math.ceil(x.distance) + 'm'}
            </div>
          ) : null
        )
      )
    }
  </div>
)
