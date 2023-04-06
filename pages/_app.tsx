import LoadProvider from '@/src/contexts/loading.context';
import UserProvider from '@/src/contexts/user.context';
import StyledGlobal from '@/src/styles/global.styles';
import type { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <LoadProvider>
      <UserProvider>
      <ToastContainer
                      position="bottom-right"
                      autoClose={2500}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss={false}
                      draggable
                      pauseOnHover={false}
                      theme="colored"
                    />
        <StyledGlobal />
        <Component {...pageProps} />
      </UserProvider>
    </LoadProvider>
  </>
  )
}
