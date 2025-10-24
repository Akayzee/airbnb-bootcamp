import AuthCard from "@/components/auth/AuthCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";

type Props = {};

const SignInPage = (props: Props) => {
  return (
    <div className="flex justify-center items-center min-h-dvh p-3">
      <Card className="w-full flex justify-center  md:w-1/3">
        <CardTitle className="text-center">Log in or Sign up</CardTitle>
        <CardContent className="">
          <Suspense>
            <AuthCard />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
