import styled, { createGlobalStyle } from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { GlobalStyleProps } from './../../types/types';
import { spacing } from '@material-ui/system';
import { Paper as MuiPaper } from '@material-ui/core';

const drawerWidth = 180;

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Drawer = styled.div``;

export const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Paper = styled(MuiPaper)(spacing);

export const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.body.background};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

export const useStyles = makeStyles((theme: Theme) => ({
  Drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: -drawerWidth,
  },
  navIcon: {
    cursor: 'pointer',
  },
}));
