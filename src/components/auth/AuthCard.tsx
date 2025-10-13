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
import { CardContent } from "../ui/card";
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

type Props = {};

const AuthSchema = z.object({
  email: z
    .email({
      error: "Email is invalid",
    })
    .optional(),
  phoneNumber: z.string({}).optional(),
});

const AuthCard = (props: Props) => {
  const { isOpen, open, close } = useAuthCardDialogStore();

  const [toggleInput, setToggleInput] = useState(true);

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });
  const onSubmit = (values: z.infer<typeof AuthSchema>) => {
    console.log("I will not run until I do not have any errors");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-3xl">
        <DialogTitle className="text-center">Log in or sign up</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {toggleInput ? (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="joe@example.com"
                        {...field}
                        className="border-1 border-gray-700"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="border-1 border-gray-700"
                        placeholder="89778879"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs ">
                      We’ll call or text you to confirm your number. Standard
                      message and data rates apply. Privacy Policy
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              disabled={form.formState.errors.email?.message ? true : false}
              type="submit"
              className="w-full bg-red-400 hover:bg-red-500 hover:cursor-pointer"
            >
              Continue
            </Button>
            <hr className="mb-3" />
            <Button
              variant="outline"
              className="w-full flex gap-10 border-1 border-black  mb-3 hover:cursor-pointer"
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
            >
              <div className="w-1/4">
                <RiFacebookCircleFill className="w-1/4" />
              </div>
              <div className="w-3/4 text-left ">
                <p>Continue with Facebook</p>
              </div>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthCard;
