"use client";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Columna izquierda: Ilustración (visible solo en desktop) */}
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="/images/auth3.jpg" // Reemplaza con la ruta de tu imagen
            alt="Ilustración de Login"
            fill
            className="object-cover"
          />
        </div>
        {/* Columna derecha: Formulario de login */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido de nuevo</h2>
          <p className="text-gray-600 mb-6">
            Inicia sesión para continuar y accede a tu dashboard.
          </p>
          <SignIn path="/auth/login" routing="path" signUpUrl="/auth/register" />
        </div>
      </div>
    </main>
  );
}
