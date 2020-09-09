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

  overflow: hidden;

  div {
    background: #fff;
    padding: 12px;

    span,
    p {
      white-space: nowrap;
    }

    span {
      color: ${whiteColor};
      font-weight: ${mediumFontWeight};
    }

    p {
      color: ${titleColor};
    }

    &:first-of-type {
      background: ${(props) => (props.isActive ? mainColor : secondColor)};
    }
  }
`;
