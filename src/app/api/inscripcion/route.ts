import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { CREATE_INSCRIPCION, PUBLISH_INSCRIPCION } from '@/lib/queries';

const endpoint = process.env.HYGRAPH_ENDPOINT!;
const token = process.env.HYGRAPH_TOKEN!;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Tipamos explícitamente la respuesta esperada de la mutación
type CrearInscripcionResponse = {
  createInscripcion: {
    id: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const { userId, cursoId } = await req.json();

    if (!userId || !cursoId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // Crear la inscripción
    const result = await graphQLClient.request<CrearInscripcionResponse>(CREATE_INSCRIPCION, {
      userId,
      cursoId,
    });

    const inscripcionId = result.createInscripcion.id;

    // Publicar la inscripción
    await graphQLClient.request(PUBLISH_INSCRIPCION, {
      id: inscripcionId,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ Error en API de inscripción:', error?.response?.errors || error.message || error);
    return NextResponse.json({ error: 'Error al inscribir' }, { status: 500 });
  }
}
