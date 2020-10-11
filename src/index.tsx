import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { Flex, Box } from 'rebass';

import { Header } from './header/header';
import { HomePage } from './pages/home/home';
import { Footer } from './footer/footer';
import { theme } from './theme';
import './global.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <Flex flexDirection="column" height="100%">
      <Header />
      <Box flex="1" overflowY="auto">
        <HomePage />
      </Box>
      <Footer />
    </Flex>
  </ThemeProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
