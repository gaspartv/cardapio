import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

export const animationEntring = keyframes`
  0%    {width: 0%;}
  100%  {width: 100%;}
`;

export const LinkStyled = styled(Link)`
  border: none;
  background-color: transparent;
  position: relative;
  font-size: 14px;
  text-decoration: none;
  color: var(--color-grey-2);
  font-weight: 600;
  cursor: pointer;
  :hover {
    color: var(--color-grey-1);
  }
  :hover span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-grey-5);
    animation: ${animationEntring} 0.2s linear;
  }
`;
