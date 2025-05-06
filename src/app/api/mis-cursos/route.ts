import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { GET_ALL_INSCRIPCIONES } from '@/lib/queries';

const endpoint = process.env.HYGRAPH_ENDPOINT!;
const token = process.env.HYGRAPH_TOKEN!;

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Tipamos la respuesta esperada
interface Inscripcion {
  id: string;
  userId: string;
  course: {
    id: string;
    titulo_Curso: string;
    slug_curso: string;
    imagenDestacada?: {
      url: string;
    };
    lessons: {
      id: string;
      slug: string;
    }[];
  };
}

interface InscripcionesResponse {
  inscripcions: Inscripcion[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Falta userId' }, { status: 400 });
    }

    const { inscripcions } = await client.request<InscripcionesResponse>(GET_ALL_INSCRIPCIONES);

    console.log("🔍 Todas las inscripciones recibidas:", inscripcions);
    console.log("🔍 userId recibido:", userId);

    const filtradas = inscripcions.filter((i) => i.userId === userId);
    console.log("✅ Inscripciones filtradas:", filtradas);

    return NextResponse.json({ inscripcions: filtradas });
  } catch (error: any) {
    console.error(
      '❌ Error en API mis-cursos:',
      error?.response?.errors || error.message || error
    );
    return NextResponse.json(
      { error: 'Error cargando inscripciones' },
      { status: 500 }
    );
  }
}
