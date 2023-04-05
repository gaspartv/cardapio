import styled, { keyframes } from 'styled-components';

export const animationEntring = keyframes`
  0%    {width: 0%;}
  100%  {width: 100%;}
`;

export const HeaderStyled = styled.header`
  > div {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 35px 12px;
      > div {
        display: flex;
        align-items: center;
        gap: 20px;
        > img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-width: 90px;
          max-height: 90px;
          border-radius: 50%;
        }
        > div {
          display: flex;
          flex-direction: column;
          > h1 {
            font-family: var(--font-family-3);
            font-size: 44px;
            letter-spacing: 1px;
            font-weight: 700;
          }
          > p {
            color: var(--color-grey-4);
            font-size: 12px;
            align-self: end;
          }
        }
        > span {
          display: flex;
          align-items: center;
          gap: 2px;
          > p {
            margin-top: 3px;
            color: #ed6c02;
          }
        }
      }
      > nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        > button {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: transparent;
          border: 1px solid transparent;
          padding: 8px 16px;
          border-radius: 24px;
          > span {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          :hover {
            cursor: pointer;
            background-color: var(--color-grey-9);
          }
        }
      }
    }
  }
`;

export const HeaderNavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    > button {
      background-color: transparent;
      cursor: pointer;
      border: none;
      letter-spacing: 1px;
      font-weight: 600;
      color: var(--color-grey-0);
      font-size: 12px;
      text-decoration: none;
      text-transform: uppercase;
      border-radius: 3px;
      padding: 12px 5px;
      position: relative;
      :hover span {
        position: absolute;
        bottom: 8px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--color-grey-5);
        animation: ${animationEntring} 0.2s linear;
      }
      :hover {
        color: var(--color-grey-2);
      }
    }
  }
  > div {
    display: flex;
    gap: 5px;
    align-items: center;
    > p {
      color: var(--color-grey-4);
      font-size: 13px;
    }
  }
`;
