const { GraphQLClient, gql } = require('graphql-request');
require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const query = gql`
  query {
    courses {
      id
      titulo_Curso
    }
  }
`;

graphQLClient
  .request(query)
  .then(data => {
    console.log("Consulta exitosa, datos recibidos:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error("Error en la consulta:", err);
  });
