"use client";

import useAuthCardDialogStore from "@/hooks/use-auth-card-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaApple } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";
import { Separator } from "../ui/separator";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

type Props = {};

const AuthCard = (props: Props) => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const { isOpen, open, close } = useAuthCardDialogStore();

  const [toggleInput, setToggleInput] = useState(true);

  return (
    <>
      <p className="text-xl font-bold text-gray-900">Welcome to Airbnb</p>
      <div className="space-y-8">
        {toggleInput ? <EmailForm /> : <PhoneForm />}

        <hr className="" />
        <Button
          variant="outline"
          className="w-full flex gap-10 border-1 border-black  mb-3 hover:cursor-pointer"
          size="lg"
          onClick={() =>
            signIn("google", {
              redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            })
          }
        >
          <div className="w-1/4">
            <FcGoogle className="w-1/4" />
          </div>
          <div className="w-3/4 text-left ">
            <p>Continue with Google</p>
          </div>
        </Button>
        <Button
          variant="outline"
          className="w-full flex gap-10 border-1 border-black  mb-3 hover:cursor-pointer"
          size="lg"
        >
          <div className="w-1/4">
            <FaApple className="w-1/4" />
          </div>
          <div className="w-3/4 text-left ">
            <p>Continue with Apple</p>
          </div>
        </Button>

        {toggleInput ? (
          <Button
            variant="outline"
            className="w-full flex gap-10 border-1 border-black  mb-3 hover:cursor-pointer"
            onClick={() => setToggleInput((prev) => !prev)}
            size="lg"
          >
            <div className="w-1/4">
              <IoPhonePortraitOutline className="w-1/4" />
            </div>
            <div className="w-3/4 text-left ">
              <p>Continue with Phone</p>
            </div>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full flex gap-10 border-1 border-black  mb-3 hover:cursor-pointer"
            onClick={() => setToggleInput((prev) => !prev)}
            size="lg"
          >
            <div className="w-1/4">
              <MdOutlineMailOutline className="w-1/4" />
            </div>
            <div className="w-3/4 text-left ">
              <p>Continue with Email</p>
            </div>
          </Button>
        )}
        <Button
          variant="outline"
          className="w-full flex gap-10 border-1 border-black  hover:cursor-pointer"
          size="lg"
        >
          <div className="w-1/4">
            <RiFacebookCircleFill className="w-1/4" />
          </div>
          <div className="w-3/4 text-left ">
            <p>Continue with Facebook</p>
          </div>
        </Button>
      </div>
    </>
  );
};

export default AuthCard;
