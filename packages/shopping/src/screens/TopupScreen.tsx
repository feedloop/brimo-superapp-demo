import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

// @ts-ignore
const TopUp = React.lazy(() => import('topup/App'));

const TopupScreen = () => {
  return (
    <ErrorBoundary name="TopupScreen">
      <React.Suspense
        fallback={<Placeholder label="TopUp" icon="plus-circle" />}>
        <TopUp />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default TopupScreen;
