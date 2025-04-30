import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Definir esquema de validación con Zod
const FormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es demasiado largo"),
  empresa: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres").max(100, "El nombre de la empresa es demasiado largo"),
  email: z.string().email("Email inválido"),
  telefono: z.string().optional().refine(
    (val) => !val || /^(\+?\d{1,3}[- ]?)?\d{9,15}$/.test(val), 
    { message: "Formato de teléfono inválido" }
  ),
  empleados: z.string().optional(),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(3000, "El mensaje es demasiado largo")
});

// Función para sanitizar texto y prevenir XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    // Verificar límite de tamaño de la solicitud
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 50000) {
      return NextResponse.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
    }

    // Obtener y validar datos del cuerpo de la solicitud
    const body = await request.json();
    
    // Validación con Zod
    const validationResult = FormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validationResult.error.issues },
        { status: 400 }
      );
    }
    
    // Usar datos validados y tipados
    const { nombre, empresa, email, telefono, empleados, mensaje } = validationResult.data;
    
    // Sanitizar los datos para prevenir XSS
    const sanitizedNombre = sanitizeHtml(nombre);
    const sanitizedEmpresa = sanitizeHtml(empresa);
    const sanitizedEmail = email; // Los emails no necesitan sanitización especial después de la validación de Zod
    const sanitizedTelefono = telefono ? sanitizeHtml(telefono) : '';
    const sanitizedEmpleados = empleados ? sanitizeHtml(empleados) : '';
    const sanitizedMensaje = sanitizeHtml(mensaje);

    console.log('Enviando email a:', 'joanmerino120205@gmail.com');
    
    // Crear HTML mejorado con mejor diseño
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva solicitud de empresa: ${sanitizedEmpresa}</title>
          <style>
            /* Estilos globales */
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #2d3748;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
            }
            
            /* Contenedor principal */
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            
            /* Cabecera */
            .header {
              background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            
            .header p {
              margin: 10px 0 0;
              opacity: 0.9;
              font-size: 16px;
            }
            
            /* Contenido */
            .content {
              padding: 30px;
            }
            
            /* Secciones */
            .section {
              margin-bottom: 25px;
              background-color: #f0f5ff;
              border-radius: 6px;
              padding: 20px;
              border-left: 4px solid #4f46e5;
            }
            
            .section-title {
              font-size: 18px;
              font-weight: 600;
              color: #4338ca;
              margin-top: 0;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #d1d9ff;
            }
            
            /* Campos */
            .field {
              margin: 10px 0;
              display: flex;
            }
            
            .field-label {
              font-weight: 600;
              min-width: 140px;
              color: #3730a3;
            }
            
            .field-value {
              flex: 1;
              color: #1e293b;
            }
            
            /* Mensaje */
            .message {
              background-color: #f0f5ff;
              border-radius: 6px;
              padding: 20px;
              border-left: 4px solid #4f46e5;
              margin-bottom: 25px;
            }
            
            .message p {
              margin: 0;
              white-space: pre-line;
              color: #1e293b;
            }
            
            /* Pie de página */
            .footer {
              text-align: center;
              padding: 20px 30px;
              background-color: #f0f5ff;
              color: #3730a3;
              font-size: 14px;
              border-top: 1px solid #d1d9ff;
            }
            
            .logo {
              font-weight: bold;
              color: #4338ca;
            }
            
            /* Botón */
            .button {
              display: inline-block;
              background-color: #4f46e5;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              margin-top: 15px;
              font-weight: 500;
              transition: background-color 0.3s;
              font-size: 16px;
              box-shadow: 0 2px 4px rgba(79, 70, 229, 0.3);
            }
            
            .button:hover {
              background-color: #4338ca;
              color: #ffffff;
            }
            
            /* Diseño responsive */
            @media only screen and (max-width: 600px) {
              .container {
                width: 100%;
                border-radius: 0;
              }
              
              .field {
                flex-direction: column;
              }
              
              .field-label {
                margin-bottom: 4px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Solicitud Empresarial</h1>
              <p>Se ha recibido una nueva solicitud de información</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2 class="section-title">Datos de la Empresa</h2>
                <div class="field">
                  <div class="field-label">Empresa:</div>
                  <div class="field-value">${sanitizedEmpresa}</div>
                </div>
                <div class="field">
                  <div class="field-label">Empleados:</div>
                  <div class="field-value">${sanitizedEmpleados || 'No especificado'}</div>
                </div>
              </div>
              
              <div class="section">
                <h2 class="section-title">Datos de Contacto</h2>
                <div class="field">
                  <div class="field-label">Nombre:</div>
                  <div class="field-value">${sanitizedNombre}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${sanitizedEmail}" style="color: #4f46e5; text-decoration: none;">${sanitizedEmail}</a></div>
                </div>
                ${sanitizedTelefono ? `
                <div class="field">
                  <div class="field-label">Teléfono:</div>
                  <div class="field-value">${sanitizedTelefono}</div>
                </div>
                ` : ''}
              </div>
              
              <div class="section">
                <h2 class="section-title">Mensaje</h2>
                <p>${sanitizedMensaje.replace(/\n/g, '<br>')}</p>
              </div>
              
              <center>
                <a href="mailto:${sanitizedEmail}" class="button" style="color: #ffffff !important;">Responder a ${sanitizedNombre}</a>
              </center>
            </div>
            
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} <span class="logo">DevLeap</span>. Todos los derechos reservados.</p>
              <p>Esta es una notificación automática del formulario de contacto.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const data = await resend.emails.send({
      from: 'DevLeap <onboarding@resend.dev>', // Cambiar a tu dominio verificado en producción
      to: ['joanmerino120205@gmail.com'], // Dirección registrada en Resend
      subject: `Nueva solicitud de empresa: ${sanitizedEmpresa}`,
      html: htmlContent,
    });

    console.log('Respuesta de Resend:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 