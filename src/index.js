import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from '@providers/AppProvider';
import GlobalStyle from '@style/global';
import theme from '@style/theme';

import App from './App';

render(
    <ThemeProvider theme={ theme }>
        <AppProvider>
            <Fragment>
                <GlobalStyle />
                <App />
            </Fragment>
        </AppProvider>
    </ThemeProvider>,
    document.getElementById('app')
);
