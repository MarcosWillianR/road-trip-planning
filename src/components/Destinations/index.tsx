import React from 'react';
import { FiMapPin, FiTrash2 } from 'react-icons/fi';

import { weatherIconUrl } from '../../utils';
import { useMapRoute } from '../../hooks/MapRouteContext';

import {
  Container,
  ContainerListItem,
  DestinyIconContainer,
  DestinyContent,
  WeatherAndDurationContent,
  RemoveDestinyButton,
} from './styles';

export interface Stop {
  id: string;
  route: {
    id: string;
    name: string;
    address: string;
    shortAddress: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
  duration: string;
  distance: string;
  weather: {
    temp: number;
    temp_min: number;
    temp_max: number;
    description: string;
    iconName: string;
    errorMessage: string | null;
  };
}

interface DestinationProps {
  isActive: boolean;
  destiny: Stop;
}

const Destinations: React.FC<DestinationProps> = ({ isActive, destiny }) => {
  const { route, weather, distance, duration, id } = destiny;
  const {
    changeMapZoom,
    changeMapCenter,
    removeDestinationFromList,
  } = useMapRoute();

  return (
    <Container isActive={isActive}>
      <ContainerListItem
        isActive={isActive}
        onClick={() => {
          changeMapZoom(16);
          changeMapCenter({ coords: route.coords });
        }}
      >
        <DestinyIconContainer isActive={isActive}>
          <FiMapPin />
        </DestinyIconContainer>

        <strong>{route.address}</strong>

        <DestinyContent isActive={isActive}>
          <strong>{route.address}</strong>

          <WeatherAndDurationContent>
            {!weather.errorMessage ? (
              <>
                <div>
                  <img
                    src={weatherIconUrl(weather.iconName)}
                    alt={weather.description}
                  />
                  <h3>{weather.description}</h3>
                </div>

                <div>
                  <strong>{`${weather.temp}°`}</strong>
                  <span>
                    mínima
                    {` ${weather.temp_min}°`}
                  </span>
                  <span>
                    máxima
                    {` ${weather.temp_max}°`}
                  </span>
                </div>
              </>
            ) : (
              <h2>Temperatura não informada</h2>
            )}

            <div>
              <strong>
                <span>kilômetros: </span>
                {distance}
              </strong>

              <strong>
                <span>tempo: </span>
                {duration}
              </strong>
            </div>
          </WeatherAndDurationContent>
        </DestinyContent>
      </ContainerListItem>

      <RemoveDestinyButton
        onClick={() =>
          removeDestinationFromList({
            stopId: id,
            rideId: route.id,
          })
        }
      >
        <FiTrash2 />
      </RemoveDestinyButton>
    </Container>
  );
};

export default Destinations;
