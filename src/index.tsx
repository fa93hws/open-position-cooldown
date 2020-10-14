import 'fontsource-roboto';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './header/header';
import { Pages } from './pages/pages';
import './global.css';

const theme = responsiveFontSizes(createMuiTheme());

const useStyles = makeStyles({
  main: {
    overflowY: 'hidden',
  },
});

const App = () => {
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.BASE_URL}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" height="100%">
          <Header />
          <Box className={styles.main} flex="1" component="main">
            <Pages />
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
