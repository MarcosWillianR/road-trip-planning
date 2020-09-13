import React from 'react';
import { FiMapPin, FiTrash2 } from 'react-icons/fi';

import { weatherIconUrl } from '../../../utils';
import { useMapRoute } from '../../../hooks/MapRouteContext';

import {
  Container,
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
  destiny: Stop;
}

const Destinations: React.FC<DestinationProps> = ({ destiny }) => {
  const { route, weather, distance, duration, id } = destiny;
  const { removeDestinationFromList } = useMapRoute();

  return (
    <Container>
      <strong>
        <FiMapPin />
        <span>{route.shortAddress}</span>
      </strong>

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
                {`${weather.temp_min}°`}
              </span>
              <span>
                máxima
                {`${weather.temp_max}°`}
              </span>
            </div>
          </>
        ) : (
          <h2>{weather.errorMessage}</h2>
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
      <RemoveDestinyButton
        onClick={() =>
          removeDestinationFromList({
            stopId: id,
            rideId: route.id,
          })}
      >
        <FiTrash2 />
      </RemoveDestinyButton>
    </Container>
  );
};

export default Destinations;
