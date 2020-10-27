import 'fontsource-roboto';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box, CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './header/header';
import { Pages } from './pages/pages';
import './global.css';

const theme = responsiveFontSizes(createMuiTheme());

export const App = () => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, [setHeight]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.BASE_URL}>
        <CssBaseline />
        <Box
          overflow="hidden"
          display="flex"
          flexDirection="column"
          height={height}
        >
          <Header />
          <Box overflow="hidden" flex="1" component="main">
            <Pages />
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
