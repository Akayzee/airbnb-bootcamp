"use client";
import useAuthCardDialogStore from "@/hooks/use-auth-card-dialog";
import React, { Suspense } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import AuthCard from "./AuthCard";

type Props = {};

const AuthDialog = (props: Props) => {
  const { isOpen, open, close } = useAuthCardDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-3xl ">
        <DialogTitle className="text-center ">Log in or sign up</DialogTitle>
        <Suspense>
          <AuthCard />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
