import React from "react";
import FinishSetupClient from "./FinishSetupClient";

type Props = {};

const FinishSetupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <FinishSetupClient id={id} />;
};

export default FinishSetupPage;
