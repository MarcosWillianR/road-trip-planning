import React from 'react';

import { Container } from './styles';

interface LoadingProps {
  size?: number;
  borderWidth?: number;
}

const Loading: React.FC<LoadingProps> = ({ size, borderWidth }) => (
  <Container>
    <span style={{ width: size, height: size, borderWidth }} />
  </Container>
);

export default Loading;
