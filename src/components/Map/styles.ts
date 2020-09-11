import styled from 'styled-components';
import {
  titleColor,
  whiteColor,
  mediumFontWeight,
  mainColor,
} from '../../styles/variables';

export const OriginContainer = styled.div`
  background: ${whiteColor};
  border: 1px solid ${mainColor};
  padding: 12px;
  text-align: center;

  p {
    white-space: nowrap;
    color: ${titleColor};
    font-weight: ${mediumFontWeight};
  }
`;
