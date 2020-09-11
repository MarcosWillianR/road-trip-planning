import React, {
  createContext,
  useMemo,
  useEffect,
  useContext,
  useState,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import weatherAPIService from '../services/WeatherApiClient';

interface Ride {
  name: string;
  address: string;
  shortAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface WeatherResponse {
  temp?: number;
  temp_min?: number;
  temp_max?: number;
  description?: string;
  iconName?: string;
  errorMessage: string | null;
}

interface Origin {
  route: Ride;
  weather: WeatherResponse;
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
  weather: WeatherResponse;
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

interface MapCenter {
  coords: {
    lat: number;
    lng: number;
  };
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
  changeMapZoom(zoom: number): void;
  changeMapCenter(data: MapCenter): void;
  changeMapElement(map: google.maps.Map): void;
  mapZoom: number;
  mapCenter: MapCenter;
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
  const [mapZoom, setMapZoom] = useState(8);
  const [mapElement, setMapElement] = useState<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState<MapCenter>({} as MapCenter);
  const [
    isActiveAddRideOriginButton,
    setIsActiveAddRideOriginButton,
  ] = useState(false);
  const [clearInputs, setClearInputs] = useState<ClearInputState>({
    originInput: false,
    destinyInput: false,
  });

  const weatherResponse = useCallback(async ({ lat, lon }): Promise<
    WeatherResponse
  > => {
    try {
      const { data } = await weatherAPIService.get('weather', {
        params: {
          lat,
          lon,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          lang: 'pt_br',
        },
      });

      const {
        main: { temp, temp_min, temp_max },
        weather,
      } = data;

      return {
        errorMessage: null,
        description: weather[0].description,
        iconName: weather[0].icon,
        temp: Math.floor(temp - 273.15),
        temp_max: Math.floor(temp_max - 273.15),
        temp_min: Math.floor(temp_min - 273.15),
      };
    } catch (err) {
      return {
        errorMessage: 'Temperatura não informada',
      };
    }
  }, []);

  const addNewOrigin = useCallback(async () => {
    if (currentRide) {
      const { origin: currentRideOrigin } = currentRide;

      if (currentRideOrigin) {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: currentRideOrigin.coords,
            destination: currentRideOrigin.coords,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          async (result, status) => {
            if (status === 'OK') {
              const {
                errorMessage,
                description,
                iconName,
                temp,
                temp_max,
                temp_min,
              } = await weatherResponse({
                lat: currentRideOrigin.coords.lat,
                lon: currentRideOrigin.coords.lng,
              });

              setOrigin({
                path: result.routes[0].overview_path,
                route: currentRideOrigin,
                weather: {
                  errorMessage,
                  description,
                  iconName,
                  temp,
                  temp_max,
                  temp_min,
                },
              });
              setDestinations([]);
            }
          },
        );

        setClearInputs({ originInput: true });
      }
    }
  }, [currentRide, weatherResponse]);

  const addNewDestination = useCallback(async () => {
    if (currentRide) {
      const { destiny, origin: currentRideOrigin } = currentRide;

      if (destiny && currentRideOrigin) {
        const directionsService = new window.google.maps.DirectionsService();

        if (currentStop) {
          directionsService.route(
            {
              origin: currentStop.coords,
              destination: destiny.coords,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            async (result, status) => {
              if (status === 'OK') {
                const {
                  errorMessage,
                  description,
                  iconName,
                  temp,
                  temp_max,
                  temp_min,
                } = await weatherResponse({
                  lat: currentRideOrigin.coords.lat,
                  lon: currentRideOrigin.coords.lng,
                });

                setDestinations((state) => [
                  ...state,
                  {
                    id: uuidv4(),
                    route: destiny,
                    path: result.routes[0].overview_path,
                    distance: result.routes[0].legs[0].distance.text,
                    duration: result.routes[0].legs[0].duration.text,
                    weather: {
                      errorMessage,
                      description,
                      iconName,
                      temp,
                      temp_max,
                      temp_min,
                    },
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
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            async (result, status) => {
              if (status === 'OK') {
                const {
                  errorMessage,
                  description,
                  iconName,
                  temp,
                  temp_max,
                  temp_min,
                } = await weatherResponse({
                  lat: currentRideOrigin.coords.lat,
                  lon: currentRideOrigin.coords.lng,
                });

                setDestinations((state) => [
                  ...state,
                  {
                    id: uuidv4(),
                    route: destiny,
                    path: result.routes[0].overview_path,
                    distance: result.routes[0].legs[0].distance.text,
                    duration: result.routes[0].legs[0].duration.text,
                    weather: {
                      errorMessage,
                      description,
                      iconName,
                      temp,
                      temp_max,
                      temp_min,
                    },
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
  }, [currentRide, currentStop, weatherResponse]);

  const addCurrentRide = useCallback((ride: Ride | null, type: string) => {
    if (type === 'geosuggest__list--select-origin') {
      setCurrentRide((state) => ({ ...state, origin: ride }));
    } else {
      setCurrentRide((state) => ({ ...state, destiny: ride }));
    }
  }, []);

  const changeMapZoom = useCallback((zoom: number) => {
    setMapZoom(zoom);
  }, []);

  const changeMapCenter = useCallback(
    ({ coords }: MapCenter) => {
      if (mapElement) {
        mapElement.panTo(coords);
        setMapCenter({ coords });
      }
    },
    [mapElement],
  );

  const changeMapElement = useCallback((map: google.maps.Map) => {
    setMapElement(map);
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
      changeMapZoom,
      changeMapCenter,
      changeMapElement,
      mapZoom,
      mapCenter,
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
      changeMapZoom,
      changeMapCenter,
      changeMapElement,
      mapZoom,
      mapCenter,
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
