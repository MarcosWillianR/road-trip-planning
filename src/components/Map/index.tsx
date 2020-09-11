import React, { memo, useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoBox } from '@react-google-maps/api';

import { useMapRoute } from '../../hooks/MapRouteContext';
import { smoothZoom } from '../../utils/mapUtils';

import Polyline from '../Polyline';

import markerIcon from '../../assets/marker.png';

import { OriginContainer } from './styles';

interface CenterState {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const {
    origin,
    mapZoom,
    mapCenter,
    destinations,
    currentStop,
    changeMapElement,
    changeMapCenter,
    changeMapZoom,
  } = useMapRoute();
  const [center, setCenter] = useState<CenterState>({
    lat: -30.1596182,
    lng: -51.1480951,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const infoBoxOptions = {
    closeBoxURL: '',
    enableEventPropagation: true,
    disableAutoPan: true,
  };

  useEffect(() => {
    if (origin) {
      changeMapZoom(16);

      changeMapCenter({
        coords: origin.route.coords,
      });
    }
  }, [origin, changeMapZoom, changeMapCenter]);

  useEffect(() => {
    if (currentStop) {
      changeMapZoom(11);

      changeMapCenter({
        coords: currentStop.coords,
      });
    }
  }, [currentStop, changeMapZoom, changeMapCenter]);

  const handleMapElement = useCallback(
    (mapElement) => {
      changeMapElement(mapElement);
      setMap(mapElement);
    },
    [changeMapElement],
  );

  useEffect(() => {
    if (mapZoom) {
      if (map) {
        smoothZoom({
          actualMapZoom: map.getZoom(),
          mapElement: map,
          zoom: mapZoom,
          zoomType: map.getZoom() >= mapZoom ? 'zoomOut' : 'zoomIn',
        });
      }
    }
  }, [mapZoom, map]);

  return (
    <GoogleMap
      id="google-map"
      zoom={8}
      onZoomChanged={() => {
        if (map) {
          changeMapZoom(map.getZoom());
        }
      }}
      onLoad={handleMapElement}
      options={{ disableDefaultUI: true }}
      center={center || mapCenter.coords}
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      {origin && (
        <Marker position={origin.route.coords} options={{ icon: markerIcon }}>
          <InfoBox position={origin.route.coords} options={infoBoxOptions}>
            <OriginContainer>
              <p>{origin.route.shortAddress}</p>
            </OriginContainer>
          </InfoBox>
        </Marker>
      )}

      {destinations.length > 0 && origin && (
        <Polyline destinations={destinations} origin={origin} />
      )}
    </GoogleMap>
  );
};

export default memo(Map);
