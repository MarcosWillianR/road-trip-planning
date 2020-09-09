import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
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
  const { addRide, isActiveAddRideButton } = useMapRoute();

  return (
    <Container>
      <TripContent>
        <header>
          <h2>RoadTrip</h2>
          <p>Escolha os melhores destinos para sua viagem</p>
        </header>

        <SelectDestinationContainer>
          <h1>Informe uma rota de viagem</h1>

          <Search id="select-origin" placeholder="Origem" />

          <Search id="select-destiny" placeholder="Destino" />

          <button
            disabled={!isActiveAddRideButton}
            type="button"
            onClick={() => addRide()}
          >
            <FiPlus />
            Adicionar
          </button>
        </SelectDestinationContainer>
      </TripContent>

      <MapContent>
        <Map />
      </MapContent>
    </Container>
  );
};

export default Home;
