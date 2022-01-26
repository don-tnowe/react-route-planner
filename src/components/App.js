import { RouteList } from './routelist/RouteList.js';
import { MapWrapper } from './map/MapWrapper.js';
import './App.css';

const App = () => {
  const mapWrapper = <MapWrapper features={[]} methods={{}}/>;
  const routeList = <RouteList mapMethods={mapWrapper.props.methods}/>;

  return <div id='content'>
    <div id='centered-all'>
      <div className='inline-combiner'>
        <div id='route-container' className='solid-panel'>
          {routeList}
        </div>
        <div id='map-container' className='solid-panel'>
          {mapWrapper}
        </div>
      </div>
    </div>
  </div>;
};


export default App;
