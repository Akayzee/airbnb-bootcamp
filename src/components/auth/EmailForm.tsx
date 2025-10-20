"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

type Props = {};

const EmailFormSchema = z.object({
  email: z.email({
    error: "Email is invalid",
  }),
});

const EmailForm = (props: Props) => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const form = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof EmailFormSchema>) => {
    signIn("resend", {
      email: values.email,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <Button
          disabled={form.formState.errors.email?.message ? true : false}
          type="submit"
          className="w-full bg-red-400 hover:bg-red-500 hover:cursor-pointer"
          size="lg"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default EmailForm;
