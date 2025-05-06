import { GraphQLClient } from 'graphql-request';
import { CREATE_INSCRIPCION, CHECK_INSCRIPCION } from './queries';

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

// Validación explícita
if (!endpoint || !endpoint.startsWith('http')) {
  throw new Error('❌ HYGRAPH_ENDPOINT no está definido correctamente.');
}

if (!token || token.length < 20) {
  throw new Error('❌ HYGRAPH_TOKEN no está definido correctamente.');
}

// Cliente de GraphQL
export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

