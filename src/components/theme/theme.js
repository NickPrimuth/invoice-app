import { createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

let theme = createMuiTheme({
  palette: {
    primary: {
      doubleLight: '#9EB5C4',
      extraLight: '#6A8A9F',
      light: '#456C85',
      main: '#10364E',
      dark: '#12212e',
    },
    secondary: {
      light: red[300],
      main: red[600],
      dark: red[800],
    },
    background: {
      default: '#f8f9fa',
      paper: '#ededed',
    },
    text: {
      secondary: '#f8f9fa',
      primary: '#12212e',
    },
  },
  typography: {
    fontFamily: [
      // 'neue-haas-grotesk-text',
      // 'Roboto',
      // 'Arial',
      // '"Helvetica Neue"',
      // 'Gotham',
      // '-apple-system,BlinkMacSystemFont',
      // 'Segoe UI',
      // 'Helvetica Neue',
      // 'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
      // '-apple-system',
      // '"Segoe UI"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontWeight: 700,
    },
    body2: {
      fontSize: '1rem',
    },
  },
});

export default theme;
