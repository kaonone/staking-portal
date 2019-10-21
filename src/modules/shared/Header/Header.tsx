import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { Grid, IconButton, Typography } from 'shared/view/elements';
import { Back } from 'shared/view/elements/Icons';
import { withComponent } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './Header.style';
import { darkTheme } from 'shared/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

const LinkIconButton = withComponent(Link)(IconButton);

interface IOwnProps {
  actions?: React.ReactNode[];
  backRoutePath?: string;
  title: React.ReactNode;
  additionalContent?: React.ReactNode;
}

type IProps = IOwnProps & StylesProps & RouteComponentProps;

class Header extends React.PureComponent<IProps> {
  public render() {
    const { classes, actions, title, backRoutePath, additionalContent } = this.props;
    return (
      <div className={classes.root}>
        <Grid container alignItems="center" spacing={2}>
          {backRoutePath && (
            <Grid item>
              <LinkIconButton to={backRoutePath} className={classes.backButton}>
                <Back />
              </LinkIconButton>
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <Typography variant="h5" noWrap weight="bold" className={classes.title}>
              {title}
            </Typography>
          </Grid>

          {actions &&
            !!actions.length &&
            actions.map((action, index) => (
              <Grid item key={index}>
                <MuiThemeProvider theme={darkTheme}>{action}</MuiThemeProvider>
              </Grid>
            ))}

          {!!additionalContent && (
            <Grid item xs={12}>
              {additionalContent}
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export { IProps };
export default withRouter(provideStyles(Header));
