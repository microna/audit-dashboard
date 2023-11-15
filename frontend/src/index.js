import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import {ThemeProvider} from '@mui/material';

import store from './redux/store';
import {theme} from './theme'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CssBaseline>
     <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Provider store={store}>
       <App/>
    </Provider>
    </BrowserRouter>
  </ThemeProvider>
  </CssBaseline>
 
  
);
