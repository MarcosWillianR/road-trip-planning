import styled from 'styled-components';
import {
  secondColor,
  titleColor,
  whiteColor,
  mediumFontWeight,
  mainColor,
} from '../../styles/variables';

interface DestinationContainerProps {
  isActive: boolean;
}

export const DestinationContainer = styled.div<DestinationContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid ${mainColor};

  overflow: hidden;

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
      background: ${(props) => (props.isActive ? mainColor : secondColor)};
    }
  }
`;

export const OriginContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  overflow: hidden;

  background: ${whiteColor};
  border: 1px solid ${mainColor};
  padding: 12px;

  p {
    white-space: nowrap;
    color: ${titleColor};
    font-weight: ${mediumFontWeight};
  }
`;
