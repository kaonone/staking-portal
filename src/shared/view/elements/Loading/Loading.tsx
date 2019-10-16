import React from 'react';
import { LinearProgress, Typography } from 'shared/view/elements';

interface IProps {
  children: React.ReactNode;
  metas: Array<{ loaded: boolean; error: string | null }>;
}

export default function Loading(props: IProps) {
  const { children, metas } = props;
  const loaded = metas.every(value => value.loaded);
  const error = (metas.find(value => value.error) || { error: null }).error;

  return (
    <>
      {!loaded && <LinearProgress />}
      {loaded && (error ? <Typography color="error">{error}</Typography> : children)}
    </>
  );
}
