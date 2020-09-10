import styled from 'styled-components';
import { shade } from 'polished';

import {
  mainColor,
  textColor,
  secondColor,
  titleColor,
  largeFontWeight,
  borderColor,
} from '../../styles/variables';

export const Container = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: space-between;
`;

export const TripContent = styled.section`
  flex: 0 1 650px;
  padding: 22px;

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #ddd;

    h2 {
      color: ${mainColor};
      font-weight: ${largeFontWeight};
      font-size: 18px;
      line-height: 1.6;

      display: flex;
      align-items: center;
    }

    p {
      color: ${textColor};
    }
  }
`;

export const MapContent = styled.section`
  flex: 1;
`;

export const SelectDestinationContainer = styled.div`
  margin-top: 22px;

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    &:first-of-type {
      border-bottom: 1px solid ${borderColor};
      padding-bottom: 32px;
    }
  }

  h1 {
    margin-bottom: 22px;
    font-size: 22px;
    color: ${titleColor};
  }

  button {
    height: 42px;
    flex: 0 1 300px;
    padding: 12px 22px;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${mainColor};
    transition: all 0.5s;

    &:hover {
      background: ${shade(0.1, mainColor)};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${secondColor};
    }

    color: #fff;

    svg {
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }
  }
`;
