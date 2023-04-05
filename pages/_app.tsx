import StyledGlobal from '@/src/styles/global.styles';
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <StyledGlobal />
    <Component {...pageProps} />;
  </>
}
