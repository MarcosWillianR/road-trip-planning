import styled, { keyframes } from 'styled-components';
import { mainColor, secondColor } from '../../styles/variables';

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    width: 45px;
    height: 45px;
    border: 5px solid ${secondColor};
    border-left-color: ${mainColor};
    border-radius: 50%;

    animation: ${spinner} 1s infinite linear;
  }
`;
