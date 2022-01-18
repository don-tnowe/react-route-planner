import './App.css';

function App() {
  return (
    <div id='content'>
      <div id='centered-all'>
        <div class='flex-combiner'>
          <div id='route-points' class='solid-panel'>
            <input type='text'
              id='route-new-point'
              class='route-point-edit'
              placeholder='Enter new point name...'
            />
            {
              [
                'adfadf',
                'adfadfda',
                'dghdgh'
              ].map(x => (
                <input 
                type='text' 
                class='route-point-edit'
                value={x}
                />
              ))
            }
          </div>
          <div id='map-container' class='solid-panel'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
