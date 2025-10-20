import { auth } from "@/auth";
import { resend } from "@/lib/resend";
import { signIn } from "next-auth/react";
import { success } from "zod";

export const login = async () => {
  try {
    await signIn("google");

    const session = await auth();

    console.log(session);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["adejuwon.femi@gmail.com"],
      subject: "hello world",
      html: "<p>it works!</p>",
      replyTo: "onboarding@resend.dev",
    });

    if (data) {
      return { success: "Successfully logged in" };
    } else {
      throw new Error("email not sent");
    }
  } catch (error) {
    return { error };
  }
};
