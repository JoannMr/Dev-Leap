import { NextResponse } from "next/server";
import { Resend } from "resend";

// Mostrar en consola para verificar que las lee correctamente
console.log("🔑 RESEND_API_KEY:", process.env.RESEND_API_KEY);
console.log("📧 FROM_EMAIL:", process.env.FROM_EMAIL);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, notifications } = await req.json();
    console.log("📤 Enviando e‑mail de confirmación a:", email, notifications);

    // Construye el HTML que quieres enviar
    const html = `
      <h1>¡Te has suscrito!</h1>
      <p>Pronto te avisaremos sobre:</p>
      <ul>
        ${notifications.newCourses ? "<li>Nuevos cursos</li>" : ""}
        ${notifications.updates    ? "<li>Actualizaciones</li>" : ""}
        ${notifications.events     ? "<li>Invitaciones a eventos</li>" : ""}
      </ul>
    `;

    // Envía con la nueva API de Resend
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Confirmación de suscripción",
      html,
    });
    console.log("✅ Resend.send respondió correctamente");

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
