import * as React from 'react';
import './fonts/index.scss';
import { colors } from './theme';
import { withStyles } from '@material-ui/styles';

const styles = {
  '@global': {
    html: {
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontSize: 16,
      fontFamily: 'OpenSans, sans-serif',
    },
    body: {
      margin: 0,
      fontSize: '1rem',
      backgroundColor: colors.alabaster,
    },
    'html, body, #root': {
      height: '100%',
    },
    '#root': {
      zIndex: 1,
      position: 'relative',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    '@media print': {
      body: {
        backgroundColor: '#fff',
      },
    },

  },
} as const;

export default withStyles(styles)(() => <noscript />);
