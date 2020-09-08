import React from 'react';
import { FiPlus } from 'react-icons/fi';

import Map from '../../components/Map';

import PlacesInput from '../../components/PlacesInput';

import {
  Container,
  MapContent,
  TripContent,
  SelectDestinationContainer,
} from './styles';

const Home: React.FC = () => (
  <Container>
    <TripContent>
      <header>
        <h2>RoadTrip</h2>
        <p>Escolha os melhores destinos para sua viagem</p>
      </header>

      <SelectDestinationContainer>
        <h1>Informe uma rota de viagem</h1>

        <PlacesInput />

        <PlacesInput />

        <button type="button">
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

export default Home;
