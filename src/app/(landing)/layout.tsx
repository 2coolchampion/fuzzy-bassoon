import React from "react";

const HomePageLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <main className="h-full">{children}</main>;
};

export default HomePageLayout;
