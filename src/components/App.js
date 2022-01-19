import { RouteList } from './routelist/RouteList.js';
import './App.css';

const App = () => (
  <div id='content'>
    <div id='centered-all'>
      <div className='inline-combiner'>
        <div id='route-container' className='solid-panel'>
          <RouteList />
        </div>
        <div id='map-container' className='solid-panel'>

        </div>
      </div>
    </div>
  </div>
);


export default App;
