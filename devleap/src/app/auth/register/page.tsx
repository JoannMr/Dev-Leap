"use client";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <main>
      <SignUp path="/auth/register" routing="path" signInUrl="/auth/login" />
    </main>
  );
}
