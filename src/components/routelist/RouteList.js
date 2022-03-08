import { useState } from 'react';
import { RouteListItem } from './RouteListItem.js';
import { RoutePointEdit } from './RoutePointEdit.js';
import { getNewPointColor } from './GetNewPointColor.js';
import './RouteList.css';

let pointCount = 0;

export const RouteList = ({ mapMethods }) => {
  const [selected, setSelected] = useState(-1);
  const [points, setPoints] = useState([]);
  const [dragging, setDragging] = useState(false);

  const addPoint = (name) => {
    if (!name)
      return;

    var newPoints = [
      { key: pointCount, name: name, color: getNewPointColor(pointCount) },
      ...points,
    ]
    pointCount++;
    newPoints[0].latlng = mapMethods.getMapCenter();
    setPoints(newPoints);
    mapMethods.setPoints(newPoints);
    mapMethods.displayInfoOf(newPoints, 0);
  }

  const deleteSelectedPoint = () => {
    points.splice(selected, 1);
    setSelected(-1);
    mapMethods.update();
  }

  const selectOrDrag = idx => {
    if (selected !== -1 && dragging) {
      const swapBuffer = points[idx];
      points[idx] = points[selected];
      points[selected] = swapBuffer;
      mapMethods.update();
    }
    else mapMethods.displayInfoOf(points, idx);
    setSelected(idx);
  }

  const deselect = () => {
    setDragging(false);
    setSelected(-1);
  }

  const setSelectionText = text => points[selected].name = text;

  return <>
    <div className='route-new-point'><input
      type='text'
      placeholder='Enter new point...'
      onKeyDown={x => {
        if (x.key === 'Enter') {
          addPoint(x.target.value);
          x.target.value = '';
        }
      }}
    />
    </div>
    <div
      className={dragging ? 'route-list-box-dragged' : null}
      onMouseLeave={deselect}
    >
      {
        points.length !== 0
          ?
          points.map((x, i) => (
            i !== selected
              ?
              <RouteListItem
                key={i}
                point={x}
                selectCallback={() => selectOrDrag(i)}
              />
              :
              <RoutePointEdit
                key={i}
                point={x}
                onChange={setSelectionText}
                onDelete={deleteSelectedPoint}
                onDrag={setDragging}
                onGoto={p => mapMethods.gotoSelected(p)}
              />
          ))
          :
          <div className='route-no-points'>
            No points in your path! Type in a name in the field above, then press 'Enter'/'Return'!
          </div>
      }
    </div>
  </>;
}