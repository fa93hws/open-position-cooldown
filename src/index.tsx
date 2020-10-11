import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';

import { Header } from './header/header';
import { HomePage } from './pages/home/home';
import { theme } from './theme';
import './global.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <Header />
    <HomePage />
  </ThemeProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
