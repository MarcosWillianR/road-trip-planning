import styled, { css } from 'styled-components';
import { shade } from 'polished';
import {
  secondColor,
  mainColor,
  whiteColor,
  mediumFontWeight,
  largeFontWeight,
  titleColor,
} from '../../styles/variables';

interface ContainerListItemProps {
  isActive: boolean;
}

export const ContainerListItem = styled.button<ContainerListItemProps>`
  width: 100%;
  height: 60px;

  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background: ${secondColor};
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  display: flex;

  &:hover {
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.2);
    background: ${shade(0.1, secondColor)};
  }

  ${(props) =>
    props.isActive &&
    css`
      height: 150px;
    `}

  > strong {
    align-items: center;
    height: 100%;
    margin: 0 auto;
    color: ${whiteColor};
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${(props) => (props.isActive ? 'display: none' : 'display: flex')}
  }
`;

export const DestinyIconContainer = styled.div<ContainerListItemProps>`
  ${(props) => (props.isActive ? 'flex: 1' : 'width: 80px;')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${whiteColor};
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  transition: all 0.8s;

  svg {
    width: ${(props) => (props.isActive ? '40px' : '28px')};
    height: ${(props) => (props.isActive ? '40px' : '28px')};
    color: ${mainColor};
  }
`;

export const DestinyContent = styled.div<ContainerListItemProps>`
  ${(props) => (!props.isActive ? 'display: none' : 'display: flex')};

  ${(props) =>
    props.isActive &&
    css`
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
    `}
`;

export const WeatherAndDurationContent = styled.div`
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

  h2 {
    font-size: 18px !important;
    font-weight: ${mediumFontWeight} !important;
    color: ${titleColor} !important;
    margin-top: 22px;
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
