import { NextResponse } from 'next/server';
import { graphQLClient } from '@/lib/graphql-client';
import { GET_COURSES } from '@/lib/queries';

export async function GET() {
  try {
    // Obtener cursos desde GraphQL
    const data = await graphQLClient.request(GET_COURSES);
    
    return NextResponse.json({ 
      courses: data.courses,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 