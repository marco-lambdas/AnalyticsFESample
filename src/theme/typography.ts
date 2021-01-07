import { TypographyOptions } from '@material-ui/core/styles/createTypography';

const typography: TypographyOptions = {
  // useNextVariants: true,
  fontFamily: [
    'Nunito',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  h1: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.75rem',
    fontWeight: 400,
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  h4: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.25rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  h5: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.00rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  h6: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  body1: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: 14,
  },
  body2: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 100,
    fontSize: 14,
  },
  caption: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 100,
    fontSize: 10,
  },
  button: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    textTransform: 'none',
  },
};

export default typography;
