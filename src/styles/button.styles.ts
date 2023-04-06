import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: var(--color-primary);
  color: var(--color-whiteFixed);
  font-weight: 400;
  height: 50px;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 16px 0;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  transform: translate(0);
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  box-shadow: 1px 1px 5px 0px black;
  ::before {
    content: '';
    position: absolute;
    background: var(--color-whiteFixed);
    width: 8px;
    top: 0;
    bottom: 0;
    left: -32px;
    transform: rotate(-16deg);
    filter: blur(6px);
  }
  :hover::before {
    left: calc(100% + 32px);
    transition: 0.75s;
  }
  :hover {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-whiteFixed);
    transform: scale(1, 1);
  }
`;
