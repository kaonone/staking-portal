import * as React from 'react';
import { GetProps } from '_helpers';
import Grid from '@material-ui/core/Grid/Grid';

import { makeStyles } from 'shared/styles';
import { attachStaticFields } from 'shared/helpers';
import { provideStyles, StylesProps } from './RowsLayout.style';

interface IProps {
  children?: React.ReactNode;
  spacing?: GetProps<typeof Grid>['spacing'];
}

function RowsLayout({ children, classes, spacing }: IProps & StylesProps) {
  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={spacing} className={classes.container}>
        {children}
      </Grid>
    </div>
  );
}

const useContentStyles = makeStyles({
  root: {
    width: `100%`,
  },
}, { name: 'ContentBlock' });

function ContentBlock(props: { children: React.ReactNode, fillIn?: boolean }) {
  const classes = useContentStyles();
  return <Grid item xs={props.fillIn} className={classes.root}>{props.children}</Grid>;
}

export { IProps };
export default attachStaticFields(provideStyles(RowsLayout), { ContentBlock });
