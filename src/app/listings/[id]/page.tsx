"use client";
import { createUser } from "@/actions/create-user";
import AuthCard from "@/components/auth/AuthCard";
import React from "react";
import toast from "react-hot-toast";

type Props = {};

const ListingPage = (props: Props) => {
  const createNewUser = () => {
    createUser().then((response) => {
      if (response?.success) {
        toast.success("user created");
      } else if (response.error) {
        toast.error(`${response.error}`);
      }
    });
  };

  return (
    <div onClick={createNewUser} className="bg-amber-500">
      Create User
    </div>
  );
};

export default ListingPage;
