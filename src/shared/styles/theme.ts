import { createMuiTheme, Theme } from '@material-ui/core/styles';

// Find color name http://chir.ag/projects/name-that-color
// https://github.com/insomnious0x01/ntc-js
export const colors = {
  mediumPurple: '#8c4be6',
  purpleHeart: '#6931b6',
  heliotrope: '#c17bff',
  wildSand: '#f4f4f4',
  mercury: '#e2e2e2',
  silver: '#c9c9c9',
  dustyGray: '#979797',
  codGray: '#1e1e1e',
  monza: '#d0021b',
  buttercup: '#f5a623',
  white: '#fff',
  black: '#000',
  gray: '#868686',
  alto: '#e0e0e0',
  heavyMetal: '#1d1d1b',
  alabaster: '#f8f8f8',
  silverChalice: '#aeaeae',
  tundora: '#4A4A4A',
  salem: '#0EA33A',
  ripeLemon: '#f8e71c',
  blackCurrant: '#2E2639',
  springWood: '#f1efe3',
  harp: '#e3f1e3',
  valencia: '#D63B3B',
  electricViolet: '#9013FE',
  apple: '#35BC2D',
  haiti: '#1D1135',
  topaz: '#746E85',
  royalPurple: '#613AAF',
  coldPurple: '#B09CD7',
  whiteLilac: '#EFEBF7',
  frenchGray: '#B6B3C0',
  athensGray: '#E8E7EB',
  shamrock: '#2ED573',
  geraldine: '#FF7888',
  ghostWhite: '#F7F5FB',
  martinique: '#3F3553',
  mulledWine: '#4A415D',
  daisyBush: '#502D98',
  moonRaker: '#E5DCF7',
  jaffa: '#F2994A',
  curiousBlue: '#2D9CDB',
  whiteMorlac: '#F7F5FC',
  whiteWine: '#FAF9FD',
  normalPurple: '#8E44DC',
  mischka: '#E0DDE6',
  ghostGray: '#F4F3F5',
  blueRibbon: '#0136ff',
  jungleGreen: '#27AE60',
};

export const gradients = {
  purple: 'linear-gradient(360deg, #7357D2 0%, #8E41DC 100%)',
};

export { Theme };
export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.purpleHeart,
      light: colors.heliotrope,
      dark: colors.royalPurple,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.white,
      light: colors.white,
      dark: colors.white,
      contrastText: colors.royalPurple,
    },
    error: {
      main: colors.geraldine,
    },
    text: {
      primary: colors.haiti,
      disabled: colors.frenchGray,
      hint: colors.heliotrope,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    subtitle2: {
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:hover:not($disabled):before': {
          borderBottom: `1px solid ${colors.royalPurple} !important`,
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: colors.topaz,
        '&$error': {
          color: colors.topaz,
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: colors.topaz,
        '&$error': {
          color: colors.topaz,
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: 'initial',
        minHeight: 40,
        fontWeight: 500,
      },
    },
    MuiSelect: {
      selectMenu: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    MuiAvatar: {
      root: {
        fontWeight: 500,
        fontSize: '0.875rem',
      },
      colorDefault: {
        backgroundColor: colors.whiteLilac,
        color: colors.royalPurple,
      },
    },
  },
});
