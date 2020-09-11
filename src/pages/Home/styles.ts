import styled from 'styled-components';
import { shade } from 'polished';

import {
  textColor,
  secondColor,
  titleColor,
  mediumFontWeight,
  largeFontWeight,
  borderColor,
  mainColor,
  whiteColor,
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

    h3 {
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

  h2 {
    font-size: 24px;
    font-weight: ${largeFontWeight};
    color: ${mainColor};
    margin-bottom: 22px;
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

export const OriginContainer = styled.div`
  max-width: 550px;
  margin: 0 auto;
`;

export const OriginContent = styled.button`
  width: 100%;
  height: 130px;
  border-radius: 10px;
  background: ${secondColor};
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  display: flex;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const OriginIconContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${whiteColor};
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  svg {
    width: 32px;
    height: 32px;
    color: ${mainColor};
  }
`;

export const OriginWrapper = styled.div`
  padding: 12px 22px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 18px;
    color: ${whiteColor};
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h2 {
    font-size: 18px;
    color: ${titleColor};
    margin-top: 22px;
  }
`;

export const WeatherContent = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
  }

  div:first-of-type {
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-weight: ${mediumFontWeight};
    color: ${mainColor};
    font-size: 16px;
  }

  strong {
    text-align: center;
    font-size: 32px;
    font-weight: ${largeFontWeight};
    color: ${mainColor};
  }

  div:last-of-type {
    margin-left: 22px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      color: ${whiteColor};
      margin-top: 2px;
    }
  }
`;
