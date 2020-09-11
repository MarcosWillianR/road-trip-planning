import React from 'react';
import { FiMapPin } from 'react-icons/fi';

import { useMapRoute } from '../../hooks/MapRouteContext';

import Map from '../../components/Map';
import Search from '../../components/Search';

import { weatherIconUrl } from '../../utils';

import {
  Container,
  MapContent,
  TripContent,
  SelectDestinationContainer,
  OriginContainer,
  OriginContent,
  OriginIconContainer,
  OriginWrapper,
  WeatherContent,
} from './styles';

const Home: React.FC = () => {
  const {
    origin,
    addNewOrigin,
    addNewDestination,
    isActiveAddRideOriginButton,
    isActiveAddStopButton,
    clearInputs,
  } = useMapRoute();

  return (
    <Container>
      <TripContent>
        <header>
          <h3>RoadTrip</h3>
          <p>Escolha os melhores destinos para sua viagem</p>
        </header>

        <SelectDestinationContainer>
          <h1>Informe uma rota de viagem</h1>

          <div>
            <Search
              clearInput={!!clearInputs.originInput}
              id="select-origin"
              placeholder="Origem"
            />

            <button
              disabled={!isActiveAddRideOriginButton}
              type="button"
              onClick={() => addNewOrigin()}
            >
              Adicionar origem
            </button>
          </div>

          <h1>Informe uma ou mais paradas</h1>

          <div>
            <Search
              clearInput={!!clearInputs.destinyInput}
              id="select-destiny"
              placeholder="Destino"
            />

            <button
              disabled={!isActiveAddStopButton}
              type="button"
              onClick={() => addNewDestination()}
            >
              Adicionar parada
            </button>
          </div>
        </SelectDestinationContainer>

        {origin && (
          <OriginContainer>
            <h2>Origem atual</h2>

            <OriginContent>
              <OriginIconContainer>
                <FiMapPin />
              </OriginIconContainer>

              <OriginWrapper>
                <strong>{origin.route.name}</strong>

                {!origin.weather.errorMessage ? (
                  <WeatherContent>
                    <div>
                      {origin.weather.iconName && (
                        <img
                          src={weatherIconUrl(origin.weather.iconName)}
                          alt={origin.weather.description}
                        />
                      )}
                      <h3>{origin.weather.description}</h3>
                    </div>

                    <div>
                      <strong>{`${origin.weather.temp}°`}</strong>
                      <span>
                        mínima
                        {` ${origin.weather.temp_min}°`}
                      </span>
                      <span>
                        máxima
                        {` ${origin.weather.temp_max}°`}
                      </span>
                    </div>
                  </WeatherContent>
                ) : (
                  <h2>{origin.weather.errorMessage}</h2>
                )}
              </OriginWrapper>
            </OriginContent>
          </OriginContainer>
        )}
      </TripContent>

      <MapContent>
        <Map />
      </MapContent>
    </Container>
  );
};

export default Home;
