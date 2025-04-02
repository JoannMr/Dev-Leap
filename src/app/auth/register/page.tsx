"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Columna izquierda: Ilustración (visible solo en desktop) */}
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="/images/login.jpg" // Reemplaza con la ruta de tu imagen para register
            alt="Ilustración de Registro"
            fill
            className="object-cover"
          />
        </div>
        {/* Columna derecha: Formulario de registro */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Crea tu cuenta</h2>
          <p className="text-gray-600 mb-6">
            Regístrate para empezar a disfrutar de todas las funcionalidades.
          </p>
          <SignUp path="/auth/register" routing="path" signInUrl="/auth/login" />
        </div>
      </div>
    </main>
  );
}
