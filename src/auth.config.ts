import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export default {
  providers: [
    Google,
    Resend({
      from: "akin@julanacademy.com",
    }),
  ],
} satisfies NextAuthConfig;
