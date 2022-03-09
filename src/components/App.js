import { RouteList } from './routelist/RouteList.js';
import { MapWrapper } from './map/MapWrapper.js';
import { MapPointInfo } from './map/MapPointInfo.js';
import './App.css';

const App = () => {
  const mapMethods = {}

  return <div id='content'>
    <div id='centered-all'>
      <div className='inline-combiner'>
        <div id='route-container' className='solid-panel'>
          <RouteList mapMethods={mapMethods} />
        </div>
        <div id='map-container' className='solid-panel'>
          <div className='map-container'>
            <MapWrapper methods={mapMethods} />
            <MapPointInfo methods={mapMethods} />
          </div>
        </div>
      </div>
    </div>
  </div>;
};


export default App;
