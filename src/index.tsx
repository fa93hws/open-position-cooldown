import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { Flex, Box } from 'rebass';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Header } from './header/header';
import { Pages } from './pages/pages';
import { theme } from './theme/theme';
import './global.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter basename={process.env.BASE_URL}>
      <CssBaseline />
      <Flex flexDirection="column" height="100%">
        <Header />
        <Box flex="1" overflowY="auto" as="main">
          <Pages />
        </Box>
      </Flex>
    </BrowserRouter>
  </ThemeProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
