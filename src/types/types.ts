import React from 'react';
import { ThemeProps } from 'styled-components';
import { SpacingProps } from '@material-ui/system';
import { Theme } from '@material-ui/core';

export type GlobalStyleProps = {
  theme: ThemeProps<Theme> & { body: any };
};

export interface MuiButtonSpacingType extends SpacingProps {
  component: React.PropsWithoutRef<{}>;
  to?: string;
}
export interface MuiChipSpacingType extends SpacingProps {
  component?: React.PropsWithoutRef<{}>;
  href?: string;
  icon?: JSX.Element | null;
}

// Routes
export type RouteInfoType = {
  id: string;
  path: string;
  icon?: JSX.Element;
  children: null | Array<ChildElementType>;
  component: React.ComponentClass<any> | null;
  badge?: string | number;
  containsHome?: boolean;
  open?: boolean;
  header?: string;
};

export type ChildElementType = {
  path: string;
  name: string;
  component: React.ComponentClass<any>;
  icon?: JSX.Element;
  badge?: string | number;
};
