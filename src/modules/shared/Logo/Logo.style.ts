import { withStyles, Theme, WithStyles } from 'shared/styles';

import { IOwnProps as IProps } from './Logo';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: (props: IProps) => props.viewType,
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '1em',
  },

  title: {
    display: ({ onlyIcon }: IProps) => onlyIcon ? 'none' : 'unset',
    fontSize: '0.45em',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    letterSpacing: '0.07em',
  },

  logo: {
    fontSize: '1em',
    flexShrink: 0,
    marginRight: ({ viewType, onlyIcon }: IProps) => viewType === 'row' && !onlyIcon ? '0.5em' : 0,
    marginBottom: ({ viewType }: IProps) => viewType === 'row' ? 0 : '0.65em',
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
