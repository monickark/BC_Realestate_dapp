import "@/styles/globals.css";

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin']
});

const theme = createTheme({
  palette: {
    text: {
      primary:'#708238'
    },
    primary:{
      main:'#fff'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>

  )
}
 export default App;