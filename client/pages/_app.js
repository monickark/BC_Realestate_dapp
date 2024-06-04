import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {StateContextProvider} from "../context";

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Roboto } from 'next/font/google'
import ResponsiveAppBar from "./AppBar/ResponsiveAppBar";


const theme = createTheme({
  palette: {
    text: {
      primary:'#708238'
    },
    primary:{
      main:'#fff'
    }
  }
})

const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider >
    <ThemeProvider theme={theme}>      
    <CssBaseline/>
      <StateContextProvider>
      <ResponsiveAppBar></ResponsiveAppBar>
          <Component {...pageProps} />
      </StateContextProvider>
        </ThemeProvider>
    </ThirdwebProvider>

  )
}
 export default App;