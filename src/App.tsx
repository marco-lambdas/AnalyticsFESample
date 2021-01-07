import React from 'react';
import { connect } from 'react-redux';
import LogRocket from 'logrocket';

import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';

import maTheme from './theme';
import Routes from './routes/Routes';
import { AppStateType } from './redux/reducers';
import { ThemeInitialStateType } from './redux/reducers/themeReducers';
import { UserProvider } from './provider/UserProvider.js';

function App({ theme }: { theme: ThemeInitialStateType }) {
  if (process.env.NODE_ENV === 'production') {
    LogRocket.init('3sslix/bd-analytics-app');
  }

  return (
    <React.Fragment>
      <UserProvider>
        <StylesProvider injectFirst>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
              <ThemeProvider theme={maTheme[theme.currentTheme]}>
                <Routes />
              </ThemeProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </UserProvider>
    </React.Fragment>
  );
}

export default connect((store: AppStateType) => ({ theme: store.themeReducer }))(App);
