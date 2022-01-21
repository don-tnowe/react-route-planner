import { useState } from 'react';
import { RouteListItem } from './RouteListItem.js';
import { RoutePointEdit } from './RoutePointEdit.js';
import { getNewPointColor } from './GetNewPointColor.js';
import './RouteList.css';


export const RouteList = () => {
  const [pointCount, setPointCount] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [points, setPoints] = useState([]);
  const [dragging, setDragging] = useState(false);

  const addPoint = (name) => {
    if (!name)
      return;
    setPointCount(pointCount + 1)
    setPoints(
      [{ key: pointCount, name: name, color: getNewPointColor(pointCount) }, ...points]
    );
  }

  const deleteSelectedPoint = () => {
    points.splice(selected, 1);
    setSelected(-1);
    setPoints(points);
  }

  const selectOrDrag = idx => {
    if (idx != -1) {
      if (selected != -1 && dragging) {
        const swapBuffer = points[idx];
        points[idx] = points[selected];
        points[selected] = swapBuffer;
        setPoints(points);
      }
    }
    else setDragging(false);
    setSelected(idx);
  }

  const setSelectionText = text => points[selected].name = text;

  return <>
    <input
      className='route-new-point'
      type='text'
      placeholder='Enter new point...'
      onKeyDown={x => {
        if (x.key == 'Enter') {
          addPoint(x.target.value);
          x.target.value = '';
        }
      }}
    />
    <div
      className={dragging ? 'route-list-box-dragged' : null}
      onMouseLeave={() => selectOrDrag(-1)}
    >
      {points.map((x, i) => (
        i != selected
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
          />
      ))
      }
    </div>
  </>;
}