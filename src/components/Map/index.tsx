import React, { memo } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import { useMapRoute } from '../../hooks/MapRouteContext';

import Direction from '../Direction';

const Map: React.FC = () => {
  const { rides } = useMapRoute();

  return (
    <GoogleMap
      id="google-map"
      zoom={10}
      options={{ disableDefaultUI: true }}
      center={{
        lat: -30.1596182,
        lng: -51.1480951,
      }}
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      {rides.length > 0 && <Direction />}
    </GoogleMap>
  );
};

export default memo(Map);
