import React, {
  createContext,
  useMemo,
  useEffect,
  useCallback,
  useContext,
  useState,
} from 'react';

interface CurrentRide {
  name: string;
  address: string;
  shortAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface CurrentRideState {
  origin?: CurrentRide | null;
  destiny?: CurrentRide | null;
}

interface MapRouteContextData {
  addCurrentRide(ride: CurrentRide | null, type: string): void;
  addRide(): void;
  isActiveAddRideButton: boolean;
}

const MapRouteContext = createContext<MapRouteContextData>(
  {} as MapRouteContextData,
);

const MapRouteProvider: React.FC = ({ children }) => {
  const [currentRide, setCurrentRide] = useState<CurrentRideState | null>(null);
  const [isActiveAddRideButton, setIsActiveAddRideButton] = useState(false);

  const addCurrentRide = useCallback(
    (ride: CurrentRide | null, type: string) => {
      if (type === 'geosuggest__list--select-origin') {
        setCurrentRide((state) => ({ ...state, origin: ride }));
      } else {
        setCurrentRide((state) => ({ ...state, destiny: ride }));
      }
    },
    [],
  );

  const addRide = useCallback(() => {
    console.log('ADICIONAR RIDE');
  }, []);

  useEffect(() => {
    if (currentRide?.destiny && currentRide?.origin) {
      setIsActiveAddRideButton(true);
    } else {
      setIsActiveAddRideButton(false);
    }
  }, [currentRide]);

  const providerValue = useMemo(
    () => ({ addCurrentRide, isActiveAddRideButton, addRide }),
    [addCurrentRide, addRide, isActiveAddRideButton],
  );

  return (
    <MapRouteContext.Provider value={providerValue}>
      {children}
    </MapRouteContext.Provider>
  );
};

function useMapRoute(): MapRouteContextData {
  const context = useContext(MapRouteContext);

  if (!context) {
    throw new Error('useMapRoute need MapRouteProvider around of component');
  }

  return context;
}

export { MapRouteProvider, useMapRoute };
