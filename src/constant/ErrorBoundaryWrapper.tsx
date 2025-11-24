// ErrorBoundaryWrapper.tsx
import React, { ComponentProps } from "react";
import ErrorBoundaryClass from "react-native-error-boundary";

type Props = ComponentProps<InstanceType<typeof ErrorBoundaryClass>>;

const ErrorBoundary: React.FC<Props> = (props) => {
  // @ts-expect-error - TS doesn't like JSX usage of this class component, but it works
  return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary;
