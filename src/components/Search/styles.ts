import styled, { css } from 'styled-components';
import { borderColor, mainColor, textColor } from '../../styles/variables';

interface SearchContainerProps {
  isFocused: boolean;
}

export const SearchContainer = styled.div<SearchContainerProps>`
  width: 100%;
  position: relative;

  & + div {
    margin-top: 12px;
  }

  display: flex;
  align-items: center;
  padding-left: 12px;
  border: 1px solid ${borderColor};
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  transition: all 0.5s;

  ${(props) =>
    props.isFocused &&
    css`
      box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-color: transparent;
    `}

  svg {
    width: 22px;
    height: 22px;
  }

  .geosuggest {
    width: 100%;

    .geosuggest__input-wrapper {
      input {
        width: 100%;
        height: 40px;
        padding: 12px;
        border: 0;
        border-radius: 8px;

        &::placeholder {
          color: ${textColor};
        }
      }
    }

    .geosuggest__suggests-wrapper {
      background: #fff;
      position: absolute;
      top: 40px;
      left: 0;

      ${(props) =>
        props.isFocused &&
        css`
          border: 1px solid ${borderColor};
        `}

      border-radius: 8px;
      border-top-color: transparent;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      z-index: 9999;
      width: 100%;
      overflow: hidden;

      ul {
        list-style: none;

        li {
          padding: 12px;
          cursor: pointer;

          &:hover {
            background-color: ${mainColor};
            span,
            b {
              color: #fff;
            }
          }
        }

        span {
          color: ${textColor};
        }

        b {
          color: ${mainColor};
        }
      }
    }

    .geosuggest__suggests--hidden {
      max-height: 0;
      overflow: hidden;
      border-width: 0;
    }
  }
`;
