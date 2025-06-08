import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

// @ts-ignore
const Topup = React.lazy(() => import('topup/App'));

const TopupScreen = () => {
  return (
    <ErrorBoundary name="TopupScreen">
      <React.Suspense fallback={<Placeholder label="Topup" icon="calendar" />}>
        <Topup />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default TopupScreen;
