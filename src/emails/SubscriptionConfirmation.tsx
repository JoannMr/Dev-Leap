// src/emails/SubscriptionConfirmation.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
} from "@react-email/components";

interface SubscriptionProps {
  notifications: {
    newCourses: boolean;
    updates: boolean;
    events: boolean;
  };
}

export default function SubscriptionConfirmation({
  notifications,
}: SubscriptionProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>¡Gracias por unirte a DevLeap!</Preview>

      <Body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#EFF6FF',
        }}
      >

        {/* Main content */}
        <Section style={{ padding: '40px 0' }}>
          <Container
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Heading
              style={{
                fontSize: 28,
                color: '#1E3A8A',
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              ¡Suscripción Confirmada!
            </Heading>

            <Text
              style={{
                fontSize: 16,
                color: '#4B5563',
                lineHeight: 1.6,
                textAlign: 'center',
                marginBottom: 32,
              }}
            >
              Gracias por formar parte de DevLeap. Te mantendremos informado sobre:
            </Text>

            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: 32 }}>
              {notifications.newCourses && (
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 18, color: '#10B981', marginRight: 12 }}>✔️</span>
                  <Text style={{ fontSize: 16, color: '#1F2937' }}>Nuevos cursos</Text>
                </li>
              )}
              {notifications.updates && (
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 18, color: '#10B981', marginRight: 12 }}>✔️</span>
                  <Text style={{ fontSize: 16, color: '#1F2937' }}>Actualizaciones de contenido</Text>
                </li>
              )}
              {notifications.events && (
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, color: '#10B981', marginRight: 12 }}>✔️</span>
                  <Text style={{ fontSize: 16, color: '#1F2937' }}>Invitaciones a eventos en vivo</Text>
                </li>
              )}
            </ul>

            <Button
              style={{
                padding: '16px 30px',
                backgroundColor: '#3B82F6',
                backgroundImage: 'linear-gradient(90deg, #3B82F6, #10B981)',
                color: '#FFFFFF',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 600,
                display: 'block',
                width: 'fit-content',
                margin: '0 auto',
              }}
              href="https://dev-leap.vercel.app/dashboard/courses"
            >
              Explorar Cursos
            </Button>

            <Text
              style={{
                fontSize: 12,
                color: '#9CA3AF',
                textAlign: 'center',
                marginTop: 32,
                lineHeight: 1.4,
              }}
            >
              Si no solicitaste esta suscripción, puedes ignorar este correo sin problema.
            </Text>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}
