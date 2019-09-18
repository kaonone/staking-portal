import { withStyles, Theme, WithStyles, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    position: 'fixed',
    zIndex: theme.zIndex.modal + 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },

  content: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logo: {
    marginBottom: '1rem',
    fontSize: '3.125rem',
  },

  spinner: {
    display: 'flex',
    marginBottom: '2.625rem',
  },

  message: {
    fontSize: '0.875rem',
    color: colors.tundora,

  },

  circle: {
    backgroundColor: colors.purpleHeart,
    opacity: 0,
    height: '0.5rem',
    width: '0.5rem',
    marginLeft: '0.4375rem',
    animationName: '$bounce_circle',
    animationDuration: '2.24s',
    animationIterationCount: 'infinite',
    animationDirection: 'normal',
    borderRadius: '100%',

    '&:nth-child(1)': {
      animationDelay: '0.45s',
      margin: 0,
    },

    '&:nth-child(2)': {
      animationDelay: '1.05s',
    },

    '&:nth-child(3)': {
      animationDelay: '1.35s',
    },
  },

  '@keyframes bounce_circle': {
    '0%': {},

    '50%': {
      opacity: 1,
    },

    '100%': {},
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
