import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { LinkProps, NavLink as RouterNavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import '../../vendor/perfect-scrollbar.css';
import { RouteInfoType, ChildElementType } from '../../types/types';
import { sidebarRoutes as routes } from '../../routes/index';

const NavLink = React.forwardRef<LinkProps, any>((props, ref) => <RouterNavLink innerRef={ref} {...props} />);

const Box = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.palette.primary.main};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)<{ button?: boolean }>`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.palette.primary.main};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  cursor: default;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
`;

type CategoryType = {
  activeClassName?: string;
  button?: boolean;
  onClick?: () => void;
  to?: string;
  component?: typeof NavLink;
  exact?: boolean;
};

const Category = styled(ListItem)<CategoryType>`
  padding-top: ${(props) => props.theme.spacing(3)}px;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(5)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) => props.theme.palette.primary.main};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }

    &:hover {
      background-color: ${(props) => props.theme.palette.secondary.main};
      span {
        color: #222831;
      }
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.typography.body1.fontFamily};
    font-family: ${(props) => props.theme.typography.body1.fontSize}px;
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    font-weight: ${(props) => props.theme.sidebar.category.fontWeight};
    padding: 0 ${(props) => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)<{ activeClassName: string; component: typeof NavLink; exact: boolean; to: string }>`
  padding-left: ${(props) => props.theme.spacing(15)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  padding-bottom: ${(props) => props.theme.spacing(2)}px;

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${(props) => props.activeClassName} {
    background-color: red;

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  padding: ${(props) => props.theme.spacing(4)}px ${(props) => props.theme.spacing(6)}px
    ${(props) => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

type SidebarCategoryPropsType = {
  name: string;
  icon: JSX.Element;
  classes?: string;
  isOpen?: boolean;
  isCollapsable: boolean;
  badge?: string | number;
  activeClassName?: string;
  button: true;
  onClick?: () => void;
  to?: string;
  component?: typeof NavLink;
  exact?: boolean;
};

const SidebarCategory: React.FC<SidebarCategoryPropsType> = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) => {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? isOpen ? <CategoryIconMore /> : <CategoryIconLess /> : null}
      {badge ? <CategoryBadge label={badge} /> : ''}
    </Category>
  );
};

type SidebarLinkPropsType = {
  name: string;
  to: string;
  badge?: string | number;
  icon?: JSX.Element;
};

const SidebarLink: React.FC<SidebarLinkPropsType> = ({ name, to, badge, icon }) => {
  return (
    <Link button dense component={NavLink} exact to={to} activeClassName="active">
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ''}
    </Link>
  );
};

type SidebarPropsType = {
  classes?: string;
  staticContext: string;
  location: {
    pathname: string;
  };
  routes: Array<RouteInfoType>;
  PaperProps: {
    style: {
      width: number;
    };
  };
  variant?: 'permanent' | 'persistent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<RouteComponentProps & SidebarPropsType> = ({ classes, staticContext, location, ...rest }) => {
  type tplotOptions = {
    [key: number]: boolean;
  };
  const initOpenRoutes = (): tplotOptions => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;

    let _routes = {};

    routes.forEach((route: RouteInfoType, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/';

      _routes = Object.assign({}, _routes, { [index]: isActive || isOpen || isHome });
    });

    return _routes;
  };

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());

  const toggle = (index: number) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) => openRoutes[index] || setOpenRoutes((openRoutes) => Object.assign({}, openRoutes, { [item]: false })),
    );

    // Toggle selected element
    setOpenRoutes((openRoutes) => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }));
  };

  return (
    <Drawer variant="persistent" {...rest}>
      <Brand button>
        <Box>
          <Img src={require('../../utils/logo/Analytics Logo_RGB Reversed.png')} alt="Analytics logo" />
        </Box>
      </Brand>
      <Scrollbar>
        <List disablePadding>
          <Items>
            {routes.map((category: RouteInfoType, index) => (
              <React.Fragment key={index}>
                {category.header ? <SidebarSection>{category.header}</SidebarSection> : null}

                {category.children && category.icon ? (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable={true}
                      name={category.id}
                      icon={category.icon}
                      button={true}
                      onClick={() => toggle(index)}
                    />

                    <Collapse in={openRoutes[index]} timeout="auto" unmountOnExit>
                      {category.children.map((route: ChildElementType, index: number) => (
                        <SidebarLink
                          key={index}
                          name={route.name}
                          to={route.path}
                          icon={route.icon}
                          badge={route.badge}
                        />
                      ))}
                    </Collapse>
                  </React.Fragment>
                ) : category.icon ? (
                  <SidebarCategory
                    isCollapsable={false}
                    name={category.id}
                    to={category.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={category.icon}
                    exact
                    button
                    badge={category.badge}
                  />
                ) : null}
              </React.Fragment>
            ))}
          </Items>
        </List>
      </Scrollbar>
    </Drawer>
  );
};

export default withRouter(Sidebar);
