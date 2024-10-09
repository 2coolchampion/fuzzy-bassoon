import React from "react";

interface ResponsiveCheckerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const ResponsiveChecker: React.FC<ResponsiveCheckerProps> = ({ children }) => {
  return <div className="flex content-center">{children}</div>;
};

export default ResponsiveChecker;
