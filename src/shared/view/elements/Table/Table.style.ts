import { Theme, colors, makeStyles } from 'shared/styles';

const bottomBorder = `0px 1px 0px rgba(0, 0, 0, 0.1)`;

const borderRadius = '0.25rem';

export const useStyles = makeStyles((theme: Theme) => {
  const horizontalCellPadding = theme.spacing(1.5);

  return {
    root: {
      width: '100%',

      '&$separated': {
        borderSpacing: '0 1rem',
        borderCollapse: 'separate',
        marginTop: '-1rem',
      },

      '& tr': {
        borderRadius,
        background: colors.white,
      },

      '& td, & th': {
        padding: `${theme.spacing(1.75)}px ${horizontalCellPadding}px`,

        '&:first-child': {
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        },

        '&:last-child': {
          paddingRight: theme.spacing(2),
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        },
      },

      '& thead tr': {
        backgroundColor: '#F4F3F5',
        borderRadius,
      },

      '& tbody tr': {
        boxShadow: bottomBorder,
      },

      '& thead td, & thead th': {
        ...theme.typography.subtitle1,
        padding: `${theme.spacing(0.75)}px ${horizontalCellPadding}px`,
        color: colors.topaz,
      },

      '& tbody td, & thead th': {
        ...theme.typography.body1,
      },
    },

    clickable: {
      cursor: 'pointer',
    },

    separated: {},
  } as const;
});
