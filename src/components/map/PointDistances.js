import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faFlag } from '@fortawesome/free-solid-svg-icons';
import { calculateDistance, calculatePathLength } from './DistanceCalculation.js';

const dataGetters = [
  (idx, pts) => (
    // First
    idx > 1 ? {
      point: pts[0],
      distance: calculatePathLength(pts, 0, idx),
      icon: faFlag,
    } : {}
  ),
  (idx, pts) => (
    // Previous
    idx > 0 ? {
      point: pts[idx - 1],
      distance: calculateDistance(pts[idx - 1], pts[idx]),
      icon: faMapMarker,
    } : {}
  ),
  (idx, pts) => ( 
    // Next
    idx < pts.length - 1 ? {
      point: pts[idx + 1],
      distance: calculateDistance(pts[idx], pts[idx + 1]),
      icon: faMapMarker,
    } : {}
  ),
  (idx, pts) => (
    // Last
    idx < pts.length - 2 ? {
      point: pts[pts.length - 1],
      distance: calculatePathLength(pts, idx, pts.length - 1),
      icon: faFlag,
    } : {}
  ),
]

export const PointDistances = ({ idx, pts }) => (
  <div className='map-point-dists'>
    {
      dataGetters.map((x, i) => {
        console.log(x);
        console.log(x(idx, pts));
        const { point, distance, icon } = x(idx, pts);
        return (
          point
            ?
            <div>
              <div className='info-icon' key={i}>
                <FontAwesomeIcon icon={icon} color={point.color} />
              </div>
              {point.name + ': ' + Math.ceil(distance) + 'm'}
            </div>
            :
            null
        );
      })
    }
  </div>
)
