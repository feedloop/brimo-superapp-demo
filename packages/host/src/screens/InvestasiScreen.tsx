import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

// @ts-ignore
const Investasi = React.lazy(() => import('investasi/App'));

const InvestasiScreen = () => {
  return (
    <ErrorBoundary name="InvestasiScreen">
      <React.Suspense
        fallback={<Placeholder label="Investasi" icon="trending-up" />}>
        <Investasi />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default InvestasiScreen;
