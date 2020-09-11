import styled from 'styled-components';
import {
  titleColor,
  whiteColor,
  mediumFontWeight,
  mainColor,
} from '../../styles/variables';

export const DestinationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${mainColor};

  div {
    background: #fff;
    padding: 12px;

    span,
    p {
      white-space: nowrap;
      font-weight: ${mediumFontWeight};
    }

    span {
      color: ${whiteColor};
    }

    p {
      color: ${titleColor};
    }

    &:first-of-type {
      background: ${mainColor};
    }
  }
`;
