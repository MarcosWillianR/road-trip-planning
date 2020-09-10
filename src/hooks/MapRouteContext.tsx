import React, {
  createContext,
  useMemo,
  useEffect,
  useCallback,
  useContext,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CurrentRide {
  name: string;
  address: string;
  shortAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface RideState {
  id: string;
  is_active: boolean;
  duration: string;
  directions: any;
  origin: CurrentRide;
  destiny: CurrentRide;
}

interface CurrentRideState {
  origin?: CurrentRide | null;
  destiny?: CurrentRide | null;
}

interface MapRouteContextData {
  addCurrentRide(ride: CurrentRide | null, type: string): void;
  addRide(): void;
  isActiveAddRideButton: boolean;
  rides: RideState[];
}

const MapRouteContext = createContext<MapRouteContextData>(
  {} as MapRouteContextData,
);

const MapRouteProvider: React.FC = ({ children }) => {
  const [currentRide, setCurrentRide] = useState<CurrentRideState | null>(null);
  const [rides, setRides] = useState<RideState[]>([]);
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

  const addRide = useCallback(async () => {
    const directionsService = new window.google.maps.DirectionsService();
    const travelMode = window.google.maps.TravelMode.DRIVING;

    let duration = '';

    if (currentRide) {
      const { destiny, origin } = currentRide;
      directionsService.route(
        {
          origin: currentRide?.origin?.coords,
          destination: currentRide?.destiny?.coords,
          travelMode,
        },
        (result, status) => {
          if (result) {
            if (status === 'OK') {
              const { routes } = result;
              duration = result.routes[0].legs[0].duration.text;

              if (destiny && origin && duration) {
                setRides((state) => [
                  ...state,
                  {
                    id: uuidv4(),
                    is_active: false,
                    origin,
                    destiny,
                    directions: result,
                    duration:
                      routes[0].legs[0].duration.text ||
                      'Duração não informada',
                  },
                ]);

                setCurrentRide(null);
              }
            }
          }
        },
      );
    }
  }, [currentRide]);

  useEffect(() => {
    if (currentRide?.destiny && currentRide?.origin) {
      setIsActiveAddRideButton(true);
    } else {
      setIsActiveAddRideButton(false);
    }
  }, [currentRide]);

  const providerValue = useMemo(
    () => ({
      addCurrentRide,
      isActiveAddRideButton,
      addRide,
      rides,
    }),
    [addCurrentRide, addRide, isActiveAddRideButton, rides],
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
