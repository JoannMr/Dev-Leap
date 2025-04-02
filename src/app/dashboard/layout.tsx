"use client";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <section>
          {/* Menú lateral o topbar del dashboard */}
          <nav>
            <ul>
              <li>Mi Perfil</li>
              <li>Mis Cursos</li>
            </ul>
          </nav>
          <div>{children}</div>
        </section>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
