import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-7xl mx-auto p-6">{children}</div>;
};

export default Container;
