import React, { useMemo } from 'react';
import { Polyline, InfoBox, Marker } from '@react-google-maps/api';

import { DestinationContainer } from './styles';

interface Ride {
  name: string;
  address: string;
  shortAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface Stop {
  id: string;
  route: Ride;
  duration: string;
  distance: string;
  path: {
    lat(): number;
    lng(): number;
  }[];
}

interface Origin {
  route: Ride;
  path: {
    lat(): number;
    lng(): number;
  }[];
}

interface DirectionProps {
  destinations: Stop[];
  origin: Origin;
}

const Direction: React.FC<DirectionProps> = ({ destinations, origin }) => {
  const infoBoxOptions = {
    closeBoxURL: '',
    enableEventPropagation: true,
    disableAutoPan: true,
  };

  const polylines = useMemo(() => {
    const formattedPolylines: any = [];

    formattedPolylines.push(...origin.path);

    destinations.forEach(({ path }) => formattedPolylines.push(...path));

    return formattedPolylines;
  }, [destinations, origin.path]);

  return (
    <>
      {polylines && (
        <Polyline
          path={polylines}
          options={{
            geodesic: true,
            strokeColor: '#FF0000',
            strokeWeight: 2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            zIndex: 1,
          }}
        />
      )}
      {destinations.length > 0 &&
        destinations.map((destination) => (
          <Marker position={destination.route.coords}>
            <InfoBox
              position={destination.route.coords}
              options={infoBoxOptions}
            >
              <DestinationContainer>
                <div>
                  <span>{destination.duration}</span>
                </div>

                <div>
                  <p>{destination.route.shortAddress}</p>
                </div>
              </DestinationContainer>
            </InfoBox>
          </Marker>
        ))}
    </>
  );
};

export default Direction;
