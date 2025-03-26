// lib/graphql-client.ts

import { GraphQLClient } from 'graphql-request';

// Lee las variables de entorno que configuraste en .env.local
const endpoint = process.env.HYGRAPH_ENDPOINT as string;
const token = process.env.HYGRAPH_TOKEN as string;

// Crea una instancia de GraphQLClient con tu endpoint y token
export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
