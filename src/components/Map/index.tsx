import React, { memo } from 'react';
import { GoogleMap } from '@react-google-maps/api';

const Map: React.FC = () => (
  <GoogleMap
    zoom={10}
    center={{
      lat: -30.1596182,
      lng: -51.1480951,
    }}
    mapContainerStyle={{
      width: '100%',
      height: '100%',
    }}
  >
    {/* Child components, such as markers, info windows, etc. */}
  </GoogleMap>
);

export default memo(Map);
