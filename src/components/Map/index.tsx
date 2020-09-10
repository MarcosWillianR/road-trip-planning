import React, { memo, useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoBox } from '@react-google-maps/api';

import { useMapRoute } from '../../hooks/MapRouteContext';

import Direction from '../Direction';

import { OriginContainer } from './styles';

interface CenterState {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const { origin, destinations, currentStop } = useMapRoute();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<CenterState>({
    lat: -30.1596182,
    lng: -51.1480951,
  });

  const infoBoxOptions = {
    closeBoxURL: '',
    enableEventPropagation: true,
    disableAutoPan: true,
  };

  const smoothZoom = useCallback(
    (
      mapElement: google.maps.Map,
      level: number,
      cnt: number,
      zoomIn: boolean,
    ) => {
      if (zoomIn) {
        if (cnt >= level) {
          return;
        }

        const zoomEvent = window.google.maps.event.addListener(
          mapElement,
          'zoom_changed',
          () => {
            window.google.maps.event.removeListener(zoomEvent);

            smoothZoom(mapElement, level, cnt + 1, true);
          },
        );

        setTimeout(() => mapElement.setZoom(cnt), 80);
      } else {
        if (cnt <= level) {
          return;
        }

        const zoomEvent = window.google.maps.event.addListener(
          mapElement,
          'zoom_changed',
          () => {
            window.google.maps.event.removeListener(zoomEvent);

            smoothZoom(mapElement, level, cnt - 1, false);
          },
        );

        setTimeout(() => mapElement.setZoom(cnt), 80);
      }
    },
    [],
  );

  useEffect(() => {
    if (origin) {
      if (map) {
        smoothZoom(map, 16, map.getZoom(), true);

        map.panTo(origin.route.coords);
      }
    }
  }, [origin, map, smoothZoom]);

  useEffect(() => {
    if (currentStop) {
      if (map) {
        smoothZoom(map, 11, map.getZoom(), false);

        map.panTo(currentStop.coords);
      }
    }
  }, [currentStop, smoothZoom, map]);

  return (
    <GoogleMap
      id="google-map"
      zoom={8}
      onLoad={(mapElement) => setMap(mapElement)}
      options={{ disableDefaultUI: true }}
      center={center}
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      {origin && (
        <Marker position={origin.route.coords}>
          <InfoBox position={origin.route.coords} options={infoBoxOptions}>
            <OriginContainer>
              <p>{origin.route.shortAddress}</p>
            </OriginContainer>
          </InfoBox>
        </Marker>
      )}

      {destinations.length > 0 && origin && (
        <Direction destinations={destinations} origin={origin} />
      )}
    </GoogleMap>
  );
};

export default memo(Map);
