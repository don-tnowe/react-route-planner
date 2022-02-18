const R = 6371e3; // metres

export const calculateDistance = (pt1, pt2) => {
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

export const calculatePathLength = (pts, first = 0, last = -1) => {
  let length = 0;
  if (last < 0) last += pts.length;

  for (let i = first + 1; i <= last; i++) {
    length += calculateDistance(pts[i - 1], pts[i]);
  }
  return length;
}
