import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

import {
  mainColor,
  largeFontWeight,
  normalFontWeight,
  textColor,
  whiteColor,
  titleColor,
  secondColor,
} from '../../styles/variables';

interface TripContentDetailsProps {
  isActive: boolean;
}

interface DestinationMapListContentProps {
  isActive: boolean;
}

export const TripContentMobile = styled.div`
  @media screen and (min-width: 961px) {
    display: none;
  }

  order: 2;
  width: 100%;
  position: relative;
`;

export const OpenContentDetailsMobileButton = styled.button.attrs({
  type: 'button',
})<TripContentDetailsProps>`
  width: 100%;
  display: ${(props) => (props.isActive ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  padding: 12px 0;

  border-top: 2px solid ${mainColor};
  color: ${mainColor};
  font-weight: ${largeFontWeight};
  background: ${whiteColor};
  font-size: 18px;

  svg {
    width: 18px;
    height: 18px;
    color: ${mainColor};
    margin-right: 8px;
  }
`;

export const OriginContainerMobile = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;

  position: absolute;
  bottom: calc(100vh - 100px);

  background: red;
  z-index: 99999;

  button {
    box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.1);
  }

  button:first-of-type {
    flex: 1;

    background: ${secondColor};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 4px;
    }

    font-size: 18px;
    color: ${whiteColor};
    font-weight: ${normalFontWeight};
  }

  button:last-of-type {
    background: ${mainColor};
    padding: 6px 0;

    svg {
      width: 18px;
      height: 18px;
      color: ${whiteColor};
    }
  }
`;

export const DestinationsMapListContainerMobile = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;

  margin-bottom: 22px;

  position: absolute;
  bottom: 47px;
  z-index: 99999;
`;

export const DestinationsMapListContentMobile = styled.button.attrs({
  type: 'button',
})<DestinationMapListContentProps>`
  flex: 1;
  min-width: 300px;
  padding: 12px 8px;
  margin: 0 11px;

  box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.1);
  background: ${(props) => (props.isActive ? mainColor : secondColor)};

  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    font-size: 18px;
    color: ${whiteColor};
    font-weight: ${normalFontWeight};

    svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  p {
    font-size: 14px;
    max-width: 260px;
    margin: 0 auto 8px auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${whiteColor};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 14px;
      color: ${whiteColor};
      font-weight: ${largeFontWeight};

      &:last-of-type {
        margin-left: 8px;
      }

      span {
        color: ${(props) => (props.isActive ? secondColor : mainColor)};
        font-weight: ${normalFontWeight};
      }
    }
  }
`;

export const TripContentDetailsMobile = styled.div<TripContentDetailsProps>`
  display: none;
  width: 100%;
  height: 100vh;
  background: ${whiteColor};

  position: relative;
  z-index: 99999;

  ${(props) =>
    props.isActive &&
    css`
      display: block;
    `}

  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #ddd;

    h3 {
      color: ${mainColor};
      font-weight: ${largeFontWeight};
      font-size: 18px;
      margin-bottom: 4px;
    }

    p {
      color: ${textColor};
      font-size: 14px;
    }
  }
`;

export const SelectDestinationContainerMobile = styled.div`
  margin-top: 22px;
  padding: 0 12px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;

    div {
      border-bottom-left-radius: 0;
      border-top-right-radius: 10px;
    }
  }

  h1 {
    margin-bottom: 12px;
    font-size: 16px;
    text-align: center;
    color: ${titleColor};
  }

  button {
    width: 100%;
    flex: 1;
    padding: 6px 22px;
    border-radius: 10px;
    text-align: center;

    border-top-right-radius: 0;
    border-top-left-radius: 0;
    font-size: 14px;
    font-weight: ${largeFontWeight};

    background: ${mainColor};
    transition: all 0.5s;

    &:disabled {
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

export const DestinationsContainerListMobile = styled.div`
  padding: 0 12px;
`;

export const CloseContentDetailsMobileButton = styled.button.attrs({
  type: 'button',
})`
  bottom: 0;
  position: fixed;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;

  border-top: 2px solid ${mainColor};
  color: ${mainColor};
  background: ${whiteColor};
  font-weight: ${largeFontWeight};
  font-size: 18px;

  svg {
    width: 18px;
    height: 18px;
    color: ${mainColor};
    margin-right: 8px;
  }
`;
