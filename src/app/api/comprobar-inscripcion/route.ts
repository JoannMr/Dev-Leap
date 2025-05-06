// app/api/comprobar-inscripcion/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { GET_ALL_INSCRIPCIONES } from '@/lib/queries';

const endpoint = process.env.HYGRAPH_ENDPOINT!;
const token = process.env.HYGRAPH_TOKEN!;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Definimos el tipo esperado de la respuesta
type InscripcionesResponse = {
  inscripcions: {
    id: string;
    userId: string;
    course: {
      id: string;
    };
  }[];
};

export async function POST(req: NextRequest) {
  try {
    const { userId, cursoId } = await req.json();

    if (!userId || !cursoId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const res = await graphQLClient.request<InscripcionesResponse>(GET_ALL_INSCRIPCIONES);

    const yaInscrito = res.inscripcions.some(
      (i) => i.userId === userId && i.course.id === cursoId
    );

    return NextResponse.json({ yaInscrito });
  } catch (error: any) {
    console.error('❌ Error comprobando inscripción:', error?.response?.errors || error.message || error);
    return NextResponse.json({ error: 'Error al comprobar inscripción' }, { status: 500 });
  }
}
