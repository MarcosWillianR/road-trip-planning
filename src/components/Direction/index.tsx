import React from 'react';
import { InfoBox, DirectionsRenderer } from '@react-google-maps/api';

import { useMapRoute } from '../../hooks/MapRouteContext';

import { DestinationContainer, OriginContainer } from './styles';
import { mainColor, secondColor } from '../../styles/variables';

const Direction: React.FC = () => {
  const { rides } = useMapRoute();
  const infoBoxOptions = {
    closeBoxURL: '',
    enableEventPropagation: true,
  };

  return (
    <>
      {rides.map((ride) => (
        <div key={ride.id}>
          <DirectionsRenderer
            options={{
              suppressMarkers: true,
              directions: ride.directions,
              polylineOptions: {
                strokeColor: ride.is_active ? mainColor : secondColor,
              },
            }}
          />
          <InfoBox position={ride.origin.coords} options={infoBoxOptions}>
            <OriginContainer>
              <p>{ride.origin.shortAddress}</p>
            </OriginContainer>
          </InfoBox>

          <InfoBox options={infoBoxOptions} position={ride.destiny.coords}>
            <DestinationContainer isActive={ride.is_active}>
              <div>
                <span>{ride.duration}</span>
              </div>

              <div>
                <p>{ride.destiny.shortAddress}</p>
              </div>
            </DestinationContainer>
          </InfoBox>
        </div>
      ))}
    </>
  );
};

export default Direction;
