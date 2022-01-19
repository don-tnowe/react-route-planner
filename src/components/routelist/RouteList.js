import { useState } from 'react';
import { RouteListItem } from './RouteListItem.js';
import { RoutePointEdit } from './RoutePointEdit.js';
import { getNewPointColor } from './GetNewPointColor.js';
import './RouteList.css';


export const RouteList = () => {
  const [pointCount, setPointCount] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [points, setPoints] = useState([]);

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
    setPoints(points);
    setSelected(-1);
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
    {points.map((x, i) => (
      i != selected
        ?
        <RouteListItem
          key={x.key}
          point={x}
          selectCallback={() => setSelected(i)}
        />
        :
        <RoutePointEdit
          key={x.key}
          point={x}
          onChange={setSelectionText} 
          onMouseLeave={() => setSelected(-1)}
          onDelete={deleteSelectedPoint}
        />
    ))
    } </>;
}