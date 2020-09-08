import React from 'react';
import Geosuggest from 'react-geosuggest';

import Map from './components/Map';

const App: React.FC = () => (
  <div>
    <h1>Road Trip Plannig!</h1>
    <Geosuggest />
    <Map />
  </div>
);

export default App;
