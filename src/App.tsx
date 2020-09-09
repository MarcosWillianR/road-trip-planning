import React from 'react';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';

import Home from './pages/Home';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Home />
    </AppProvider>
  </>
);

export default App;
