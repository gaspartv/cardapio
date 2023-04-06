import styled from 'styled-components';

export const MainDashboardStyled = styled.section`
  background-color: var(--color-grey-9);
  border-bottom: 1px solid var(--color-grey-4);
  cursor: default;
  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    position: relative;
    > svg {
      position: absolute;
      right: 12px;
      cursor: pointer;
      padding: 8px;
      :hover {
        border-radius: 50%;
        cursor: pointer;
        background-color: var(--color-grey-8);
      }
    }
    > h1 {
      font-size: 36px;
      font-family: var(--font-family-2);
    }
  }
`;
