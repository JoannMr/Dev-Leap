// src/app/api/promociones/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import SubscriptionConfirmation from "@/emails/SubscriptionConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, notifications } = await req.json();

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Confirmación de suscripción",
      react: <SubscriptionConfirmation notifications={notifications} />,
    });

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
