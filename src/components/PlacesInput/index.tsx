import React, { useState } from 'react';
import Input from 'react-geosuggest';
import { FiMapPin } from 'react-icons/fi';

import { InputContainer } from './styles';

const PlacesInput: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer isFocused={isFocused}>
      <FiMapPin />
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </InputContainer>
  );
};

export default PlacesInput;
