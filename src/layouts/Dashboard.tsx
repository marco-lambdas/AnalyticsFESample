import React, { useState } from 'react';
import { RouteInfoType } from './../types/types';
import Sidebar from '../_/organisms/sidebar.organism';
import Header from '../_/organisms/header.organism';
import Footer from '../_/organisms/footer.organism';

import { Hidden, CssBaseline, withWidth } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { isWidthUp } from '@material-ui/core/withWidth';
import { GlobalStyle, Root, Drawer, AppContent, useStyles, MainContent } from './styles/Dashboard.styles';

const drawerWidth = 180;

type DashboardPropsType = {
  routes: Array<RouteInfoType>;
  width: 'md' | 'xs' | 'sm' | 'lg' | 'xl';
};

const Dashboard: React.FC<DashboardPropsType> = ({ children, routes, width }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const contentDrawer = sideBarOpen ? classes.content : classes.contentShift;
  const NavIcon = sideBarOpen ? ArrowBackIosIcon : MenuIcon;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer className={classes.Drawer}>
        <Hidden mdUp implementation="js">
          <Sidebar
            routes={routes}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar
            routes={routes}
            variant="persistent"
            open={sideBarOpen}
            PaperProps={{ style: { width: drawerWidth } }}
          />
        </Hidden>
      </Drawer>
      <AppContent className={contentDrawer}>
        <Header onDrawerToggle={handleDrawerToggle}>
          <NavIcon onClick={handleSideBar} className={classes.navIcon} />
        </Header>
        <MainContent p={isWidthUp('lg', width) ? 10 : 5}>{children}</MainContent>
        <Footer />
      </AppContent>
    </Root>
  );
};

export default withWidth()(Dashboard);
