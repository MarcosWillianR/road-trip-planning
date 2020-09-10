import React, { useEffect } from 'react';

import { useMapRoute } from '../../hooks/MapRouteContext';

import Map from '../../components/Map';

import Search from '../../components/Search';

import {
  Container,
  MapContent,
  TripContent,
  SelectDestinationContainer,
} from './styles';

const Home: React.FC = () => {
  const {
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
          <h2>RoadTrip</h2>
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
      </TripContent>

      <MapContent>
        <Map />
      </MapContent>
    </Container>
  );
};

export default Home;
