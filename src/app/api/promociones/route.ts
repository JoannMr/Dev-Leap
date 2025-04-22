// src/app/api/promociones/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, notifications } = await req.json();

    // Solo loguea en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log("📤 Enviando e‑mail de confirmación a:", email, notifications);
    }

    const html = `
      <h1>¡Te has suscrito!</h1>
      <p>Pronto te avisaremos sobre:</p>
      <ul>
        ${notifications.newCourses ? "<li>Nuevos cursos</li>" : ""}
        ${notifications.updates    ? "<li>Actualizaciones</li>" : ""}
        ${notifications.events     ? "<li>Invitaciones a eventos</li>" : ""}
      </ul>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Confirmación de suscripción",
      html,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Resend.send respondió correctamente");
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("❌ /api/promociones error:", err);
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
