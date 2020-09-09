import React, { memo, useCallback, useState } from 'react';
import {
  GoogleMap,
  InfoBox,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';

import { DestinationContainer } from './styles';
import { mainColor, secondColor } from '../../styles/variables';

const Map: React.FC = () => {
  const [direction, setDirection] = useState(undefined);

  const handleDrectionsService = useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirection(response);
      }
    }
  }, []);

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
      <DirectionsService
        options={{
          origin: {
            lat: -30.0346471,
            lng: -51.2176584,
          },
          destination: {
            lat: -23.5505199,
            lng: -46.6333094,
          },
          travelMode: window.google?.maps?.TravelMode.DRIVING,
        }}
        callback={handleDrectionsService}
      />

      {direction && (
        <>
          <DirectionsRenderer
            options={{
              suppressMarkers: true,
              directions: direction,
              polylineOptions: {
                strokeColor: mainColor,
              },
            }}
          />
          <InfoBox
            position={{
              lat: -30.0346471,
              lng: -51.2176584,
            }}
            options={{
              closeBoxURL: '',
              enableEventPropagation: true,
            }}
          >
            <DestinationContainer isActive={false}>
              <div>
                <span>13 horas 43 minutos minutos</span>
              </div>

              <div>
                <p>São Paulo - SP</p>
              </div>
            </DestinationContainer>
          </InfoBox>
          <InfoBox
            options={{
              closeBoxURL: '',
              enableEventPropagation: true,
            }}
            position={{ lat: -23.5505199, lng: -46.6333094 }}
          >
            <DestinationContainer isActive>
              <div>
                <span>13 horas 43 minutos minutos</span>
              </div>

              <div>
                <p>São Paulo - SP</p>
              </div>
            </DestinationContainer>
          </InfoBox>
        </>
      )}
    </GoogleMap>
  );
};

export default memo(Map);
