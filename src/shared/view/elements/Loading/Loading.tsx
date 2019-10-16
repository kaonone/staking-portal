import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Hint from '../Hint/Hint';
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';

interface IMeta {
  loaded: boolean;
  error: string | null;
}

interface IProps {
  children: React.ReactNode;
  meta: IMeta | IMeta[];
  variant?: 'hint';
  progressVariant?: 'linear' | 'circle';
}

export default function Loading(props: IProps) {
  const { children, variant, progressVariant } = props;
  const metas = Array.isArray(props.meta) ? props.meta : [props.meta];

  const loaded = metas.every(value => value.loaded);
  const error = (metas.find(value => value.error) || { error: null }).error;

  const Wrapper = variant === 'hint' ? Hint : React.Fragment;

  return (
    <>
      {!loaded && <Wrapper>{progressVariant === 'circle' ? <CircleProgressBar /> : <LinearProgress />}</Wrapper>}
      {loaded && !!error && (
        <Wrapper>
          <Typography color="error">{error}</Typography>
        </Wrapper>
      )}
      {loaded && !error && children}
    </>
  );
}
