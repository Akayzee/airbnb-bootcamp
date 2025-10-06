import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="max-w-7xl mx-auto p-4">{children}</div>;
};

export default Container;
