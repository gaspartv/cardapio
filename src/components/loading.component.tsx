/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { StyledLoading } from '../styles/loading.styles';

export const Loading = () => {
  return (
    <StyledLoading>
      <Image src="/image/loading.gif" alt="Loading" width={400} height={300} />
    </StyledLoading>
  );
};
