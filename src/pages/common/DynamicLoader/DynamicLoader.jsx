import React, { lazy, Suspense } from "react";
import PageLoader from "../PageLoader";

const DynamicLoader = (path) => {
  const AsyncComponent = lazy(path);

  return (props) => {
    return (
      <Suspense fallback={<PageLoader />}>
        <AsyncComponent {...props} />
      </Suspense>
    );
  };
};

export default DynamicLoader;
