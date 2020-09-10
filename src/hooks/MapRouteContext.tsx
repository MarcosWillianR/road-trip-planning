import React, {
  createContext,
  useMemo,
  useEffect,
  useContext,
  useState,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import weatherAPI from '../services/WeatherApiClient';

interface Ride {
  name: string;
  address: string;
  shortAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface Origin {
  route: Ride;
  path: {
    lat(): number;
    lng(): number;
  }[];
}

interface Stop {
  id: string;
  route: Ride;
  duration: string;
  distance: string;
  path: {
    lat(): number;
    lng(): number;
  }[];
}

interface CurrentRideState {
  origin?: Ride | null;
  destiny?: Ride | null;
}

interface ClearInputState {
  originInput?: boolean;
  destinyInput?: boolean;
}

interface MapRouteContextData {
  addCurrentRide(ride: Ride | null, type: string): void;
  addNewOrigin(): void;
  addNewDestination(): void;
  isActiveAddRideOriginButton: boolean;
  isActiveAddStopButton: boolean;
  origin: Origin | null;
  destinations: Stop[];
  currentStop: Ride | null;
  clearInputs: ClearInputState;
}

const MapRouteContext = createContext<MapRouteContextData>(
  {} as MapRouteContextData,
);

const MapRouteProvider: React.FC = ({ children }) => {
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [currentStop, setCurrentStop] = useState<Ride | null>(null);
  const [currentRide, setCurrentRide] = useState<CurrentRideState | null>(null);
  const [destinations, setDestinations] = useState<Stop[]>([] as Stop[]);
  const [isActiveAddStopButton, setIsActiveAddStopButton] = useState(false);
  const [
    isActiveAddRideOriginButton,
    setIsActiveAddRideOriginButton,
  ] = useState(false);
  const [clearInputs, setClearInputs] = useState<ClearInputState>({
    originInput: false,
    destinyInput: false,
  });

  const directionsService = useMemo(
    () => new window.google.maps.DirectionsService(),
    [],
  );
  const { DRIVING } = window.google.maps.TravelMode;

  const addNewOrigin = useCallback(() => {
    if (currentRide) {
      const { origin: currentRideOrigin } = currentRide;

      if (currentRideOrigin) {
        directionsService.route(
          {
            origin: currentRideOrigin.coords,
            destination: currentRideOrigin.coords,
            travelMode: DRIVING,
          },
          (result, status) => {
            if (status === 'OK') {
              setOrigin({
                path: result.routes[0].overview_path,
                route: currentRideOrigin,
              });
              setDestinations([]);
            }
          },
        );

        setClearInputs({ originInput: true });
      }
    }
  }, [currentRide, directionsService, DRIVING]);

  const weatherResponse = useCallback(async ({ lat, lon }) => {
    try {
      const response = await weatherAPI.get('weather', {
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          lang: 'pt_br',
        },
      });

      console.log('response: ', response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addNewDestination = useCallback(async () => {
    if (currentRide) {
      const { destiny, origin: currentRideOrigin } = currentRide;

      if (destiny && currentRideOrigin) {
        if (currentStop) {
          directionsService.route(
            {
              origin: currentStop.coords,
              destination: destiny.coords,
              travelMode: DRIVING,
            },
            (result, status) => {
              if (status === 'OK') {
                setDestinations((state) => [
                  ...state,
                  {
                    id: uuidv4(),
                    route: destiny,
                    path: result.routes[0].overview_path,
                    distance: result.routes[0].legs[0].distance.text,
                    duration: result.routes[0].legs[0].duration.text,
                  },
                ]);

                setCurrentStop(destiny);
                setClearInputs({ destinyInput: true });
              }
            },
          );
        } else {
          directionsService.route(
            {
              origin: currentRideOrigin.coords,
              destination: destiny.coords,
              travelMode: DRIVING,
            },
            (result, status) => {
              if (status === 'OK') {
                setDestinations((state) => [
                  ...state,
                  {
                    id: uuidv4(),
                    route: destiny,
                    path: result.routes[0].overview_path,
                    distance: result.routes[0].legs[0].distance.text,
                    duration: result.routes[0].legs[0].duration.text,
                  },
                ]);

                setCurrentStop(destiny);
                setClearInputs({ destinyInput: true });
              }
            },
          );
        }
      }
    }
  }, [currentRide, directionsService, DRIVING, currentStop]);

  const addCurrentRide = useCallback((ride: Ride | null, type: string) => {
    if (type === 'geosuggest__list--select-origin') {
      setCurrentRide((state) => ({ ...state, origin: ride }));
    } else {
      setCurrentRide((state) => ({ ...state, destiny: ride }));
    }
  }, []);

  useEffect(() => {
    if (currentRide?.origin) {
      setIsActiveAddRideOriginButton(true);
      setClearInputs({ originInput: false });
    } else {
      setIsActiveAddRideOriginButton(false);
    }

    if (currentRide?.destiny && origin) {
      setClearInputs({ destinyInput: false });
      setIsActiveAddStopButton(true);
    } else {
      setIsActiveAddStopButton(false);
    }
  }, [currentRide, origin]);

  const providerValue = useMemo(
    () => ({
      addCurrentRide,
      addNewOrigin,
      addNewDestination,
      isActiveAddRideOriginButton,
      isActiveAddStopButton,
      origin,
      destinations,
      currentStop,
      clearInputs,
    }),
    [
      addCurrentRide,
      addNewOrigin,
      addNewDestination,
      isActiveAddRideOriginButton,
      isActiveAddStopButton,
      origin,
      destinations,
      currentStop,
      clearInputs,
    ],
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
