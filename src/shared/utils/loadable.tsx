import React, { lazy, Suspense } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const loadable = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  importFunc: Promise<{ default: any }>,
  { fallback } = { fallback: <LoadingOutlined /> },
) => {
  const LazyComponent = lazy(() => importFunc);
  // eslint-disable-next-line react/display-name
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
