import styled from 'styled-components';
import {
  secondColor,
  mainColor,
  whiteColor,
  mediumFontWeight,
  largeFontWeight,
  titleColor,
} from '../../../styles/variables';

export const Container = styled.li`
  width: 100%;

  border-radius: 10px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
  background: ${secondColor};
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;

  > strong {
    font-size: 16px;
    color: ${whiteColor};
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 12px;

    span {
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    svg {
      width: 18px;
      height: 18px;
      color: ${mainColor};
      margin-right: 8px;
    }
  }
`;

export const WeatherAndDurationContent = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;

  img {
    max-width: 100%;
  }

  div:first-of-type {
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    width: 100%;
    font-size: 16px !important;
    font-weight: ${mediumFontWeight} !important;
    color: ${titleColor} !important;
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

  div:nth-of-type(2) {
    margin-left: 22px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      color: ${whiteColor};
      margin-top: 2px;
    }
  }

  div:last-of-type {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    margin-left: 22px;

    span {
      font-weight: ${mediumFontWeight};
      color: ${mainColor};
    }

    strong {
      font-size: 14px;
      color: ${whiteColor};

      & + strong {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid ${mainColor};
      }
    }
  }
`;

export const RemoveDestinyButton = styled.button.attrs({
  type: 'button',
})`
  background: ${mainColor};
  margin-top: 12px;
  padding: 6px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  svg {
    width: 18px;
    height: 18px;
    color: ${whiteColor};
  }
`;
