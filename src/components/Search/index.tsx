import React, { useState, useCallback, useRef, useEffect } from 'react';
import Input, { GeosuggestProps } from 'react-geosuggest';
import { FiMapPin } from 'react-icons/fi';

import { useMapRoute } from '../../hooks/MapRouteContext';

import { mainColor, textColor } from '../../styles/variables';
import { SearchContainer } from './styles';

interface AddressComponentProps {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

interface SuggestRef extends Input {
  listId: string;
}

interface SearchProps extends GeosuggestProps {
  clearInput: boolean;
}

const Search: React.FC<SearchProps> = ({
  id,
  clearInput,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<SuggestRef>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isSuggestSelected, setIsSuggestSelected] = useState(false);
  const { addCurrentRide } = useMapRoute();

  const handleSuggestSelected = useCallback(
    (suggest) => {
      let city;

      if (!suggest) {
        setIsSuggestSelected(false);

        if (inputRef?.current?.listId) {
          addCurrentRide(null, inputRef.current.listId);
        }

        return null;
      }

      try {
        const {
          short_name: addressType1,
        } = suggest.gmaps.address_components.find(
          (address: AddressComponentProps) =>
            address.types.find(
              (type) => type === 'administrative_area_level_2',
            ),
        );

        const {
          short_name: addressType2,
        } = suggest.gmaps.address_components.find(
          (address: AddressComponentProps) =>
            address.types.find(
              (type) => type === 'administrative_area_level_1',
            ),
        );

        if (addressType1 === suggest.gmaps.name) {
          city = addressType2;
        } else {
          city = addressType1;
        }
      } catch (error) {
        city = suggest.gmaps.vicinity;
      }

      if (inputRef?.current?.listId) {
        addCurrentRide(
          {
            name: suggest.gmaps.name,
            address: suggest.label,
            shortAddress: `${suggest.gmaps.name} - ${city}`,
            coords: {
              lat: suggest.gmaps.geometry.location.lat(),
              lng: suggest.gmaps.geometry.location.lng(),
            },
          },
          inputRef.current.listId,
        );
      }
    },
    [addCurrentRide],
  );

  useEffect(() => {
    if (clearInput) {
      if (inputRef.current) {
        inputRef.current.clear();
      }
    }
  }, [clearInput]);

  return (
    <SearchContainer isFocused={isFocused}>
      <FiMapPin
        color={isFocused || isSuggestSelected ? mainColor : textColor}
      />
      <Input
        id={id}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        location={new window.google.maps.LatLng(-30.1596182, -51.1480951)}
        radius={20}
        onSuggestSelect={handleSuggestSelected}
        ref={inputRef}
        {...rest}
      />
    </SearchContainer>
  );
};

export default Search;
