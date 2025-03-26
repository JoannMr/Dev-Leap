"use client";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main>
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/register" />
    </main>
  );
}
