import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { useTranslate, ITranslateKey } from 'services/i18n';
import { makeStyles } from 'shared/styles';

import Hint from '../Hint/Hint';
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';

interface IMeta {
  loaded: boolean;
  error: ITranslateKey | null;
}

interface IProps {
  children: React.ReactNode;
  meta: IMeta | IMeta[];
  variant?: 'hint';
  progressVariant?: 'linear' | 'circle';
  hideError?: boolean;
}

const useStyles = makeStyles({
  linearProgress: {
    flexGrow: 1,
  },
});

export default function Loading(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslate();
  const { children, variant, progressVariant, hideError } = props;
  const metas = Array.isArray(props.meta) ? props.meta : [props.meta];

  const loaded = metas.every(value => value.loaded);
  const error = (metas.find(value => value.error) || { error: null }).error;

  const Wrapper = variant === 'hint' ? Hint : React.Fragment;

  return (
    <>
      {!loaded && (
        <Wrapper>
          {progressVariant === 'circle' ? <CircleProgressBar /> : <LinearProgress className={classes.linearProgress} />}
        </Wrapper>
      )}
      {loaded && !!error && !hideError && (
        <Wrapper>
          <Typography color="error" dangerouslySetInnerHTML={{__html: t(error)}} />
        </Wrapper>
      )}
      {loaded && !error && children}
    </>
  );
}
