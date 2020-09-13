import React, { useEffect, useState, useCallback } from 'react';
import { FiChevronDown, FiTrash2 } from 'react-icons/fi';
import { Scrollbars } from 'react-custom-scrollbars';

import { useMapRoute } from '../../hooks/MapRouteContext';

import Map from '../../components/Map';
import Search from '../../components/Search';
import Destinations, { Stop } from '../../components/Destinations';

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
  RemoveOriginButton,
  WeatherContent,
  DestinationsContainerList,
} from './styles';
import { TripContentMobile } from './stylesMobile';

const Home: React.FC = () => {
  const [isActive, setIsActive] = useState('');
  const {
    origin,
    destinations,
    addNewOrigin,
    addNewDestination,
    isActiveAddRideOriginButton,
    changeMapZoom,
    changeMapCenter,
    isActiveAddStopButton,
    clearInputs,
    removeCurrentOrigin,
  } = useMapRoute();

  const handleToggleActive = useCallback((id: string) => {
    setIsActive((state) => (state === id ? '' : id));
  }, []);

  return (
    <Container>
      <TripContent>
        <header>
          <h3>RoadTrip</h3>
          <p>Escolha os melhores destinos para sua viagem</p>
        </header>

        <SelectDestinationContainer>
          {!origin && (
            <>
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
            </>
          )}

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

            <OriginContent
              onClick={() => {
                changeMapZoom(16);
                changeMapCenter({ coords: origin.route.coords });
              }}
            >
              <OriginIconContainer>
                <span />
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
              <RemoveOriginButton onClick={() => removeCurrentOrigin()}>
                <FiTrash2 />
              </RemoveOriginButton>
            </OriginContent>
          </OriginContainer>
        )}

        <Scrollbars
          autoHeight
          autoHeightMin={330}
          autoHide
          renderThumbVertical={(...props) => (
            <div
              style={{
                borderRadius: 8,
                backgroundColor: '#623cea',
                cursor: 'pointer',
              }}
              {...props}
            />
          )}
        >
          <DestinationsContainerList>
            {destinations.length > 0 &&
              destinations.map((destination) => (
                <li>
                  <Destinations
                    destiny={destination as Stop}
                    isActive={isActive === destination.id}
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleActive(destination.id)}
                  >
                    <FiChevronDown />
                  </button>
                </li>
              ))}
          </DestinationsContainerList>
        </Scrollbars>
      </TripContent>

      {/* <TripContentMobile>
        <h1>EITA PREULA...</h1>
      </TripContentMobile> */}

      <MapContent>
        <Map />
      </MapContent>
    </Container>
  );
};

export default Home;
