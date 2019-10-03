import { Theme, colors, makeStyles } from 'shared/styles';

const bottomBorder = `0px 1px 0px rgba(0, 0, 0, 0.1)`;

const borderRadius = '0.25rem';

export const useStyles = makeStyles((theme: Theme) => {
  const horizontalCellPadding = theme.spacing(1.5);

  return {
    hint: {
      padding: theme.spacing(2),
      borderRadius: '0.25rem',
      backgroundColor: colors.whiteLilac,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },

    table: {
      marginTop: '-1rem',
    },

    row: {
      boxShadow: bottomBorder,
      borderRadius,
      background: colors.white,
    },

    header: {
      backgroundColor: '#F4F3F5',
      borderRadius,
    },

    active: {},

    cell: {
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

    headerCell: {
      padding: `${theme.spacing(0.75)}px ${horizontalCellPadding}px`,
    },

    headerTitle: {
      color: colors.topaz,
    },

    memberNumber: {
      color: colors.topaz,
    },

    userTag: {
      padding: `${theme.spacing(0.5)}px ${theme.spacing()}px`,
      borderRadius: '2.125rem',
      background: colors.whiteLilac,
      color: colors.royalPurple,
    },

    avatar: {
      width: '1.5rem',
      height: '1.5rem',
      marginRight: theme.spacing(),
    },

    pagination: {
      marginBottom: theme.spacing(2),
    },

  };
});
