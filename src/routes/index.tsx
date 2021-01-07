import React from 'react';

import async from '../_/atoms/async.atom';

import { Sliders, Users } from 'react-feather';

// Dashboards components
const Default = async(() => import('../pages/dashboard/dashboard'));
// const Analytics = async(() => import('../pages/dashboards/Analytics'));

// Auth components
const SignIn = async(() => import('../pages/auth/signin/sign-in'));
const SignUp = async(() => import('../pages/auth/signup/sign-up'));
const ResetPassword = async(() => import('../pages/auth/resetpassword/reset-password'));
const Page404 = async(() => import('../pages/error/page404/Page404'));
const Page500 = async(() => import('../pages/error/page500/Page500'));
const EmailConfirmation = async(() => import('../pages/auth/emailconfirmation/email-confirmation'));
const ResendEmailVerification = async(() => import('../pages/auth/resendemailverification/resend-email-verification'));

const DefaultRoutes = {
  id: 'Default',
  path: '/',
  component: Default,
  children: null,
};

const dashboardsRoutes = {
  id: 'Dashboard',
  path: '/dashboard',
  icon: <Sliders />,
  component: Default,
  children: null,
};

const authRoutes = {
  id: 'Auth',
  path: '/auth',
  icon: <Users />,
  children: [
    {
      path: '/auth/sign-in',
      name: 'Sign In',
      component: SignIn,
    },
    {
      path: '/auth/sign-up',
      name: 'Sign Up',
      component: SignUp,
    },
    {
      path: '/auth/reset-password',
      name: 'Reset Password',
      component: ResetPassword,
    },
    {
      path: '/auth/404',
      name: '404 Page',
      component: Page404,
    },
    {
      path: '/auth/500',
      name: '500 Page',
      component: Page500,
    },
    {
      path: '/auth/confirmation/:token',
      name: 'Email Confirmation',
      component: EmailConfirmation,
    },
    {
      path: '/auth/resendemailverification/',
      name: 'Resend Email Verification',
      component: ResendEmailVerification,
    },
  ],
  component: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [DefaultRoutes, dashboardsRoutes];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [dashboardsRoutes];
