import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { Flex, Box } from 'rebass';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './header/header';
import { Pages } from './pages/pages';
import { Footer } from './footer/footer';
import { theme } from './theme';
import './global.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter basename="open-position-cooldown">
      <Flex flexDirection="column" height="100%">
        <Header />
        <Box flex="1" overflowY="auto" p={[3, 4]}>
          <Pages />
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  </ThemeProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
