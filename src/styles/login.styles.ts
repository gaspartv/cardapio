import styled from 'styled-components';

export const SessionPageStyled = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/image/background.jpg');
  background-size: cover;
  height: 100vh;
  width: 100%;
  > div {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 280px;
    background-color: var(--color-grey-10);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px 1px black;
    > h1 {
      font-size: 32px;
      text-align: center;
      font-family: var(--font-family-2);
      letter-spacing: 2px;
    }
    > form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      > div {
        display: flex;
        flex-direction: column;
        position: relative;

        > span {
          position: absolute;
          right: 10px;
          top: 23px;
          cursor: pointer;
          opacity: 0.5;
        }
        > div {
          display: flex;
          flex-direction: column;
          align-items: end;
          margin-bottom: 8px;

          > p {
            font-size: 13px;
            padding-left: 1px;
            color: var(--color-grey-3);
          }
        }
      }
    }
  }
`;
