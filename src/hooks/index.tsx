import React from 'react';

import { MapRouteProvider } from './MapRouteContext';

const AppProvider: React.FC = ({ children }) => (
  <MapRouteProvider>{children}</MapRouteProvider>
);

export default AppProvider;
