import { ApolloClient, DocumentNode, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost';
import fetch from 'cross-fetch';

export const globalToken = { accessToken: '' };
const graphQL_endpoint = process.env.REACT_APP_ENDPOINT;

export const client = new ApolloClient({
  link: new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: globalToken.accessToken ? `Bearer ${globalToken.accessToken}` : '',
      },
    });
    return forward(operation);
  }).concat(
    new HttpLink({
      uri: graphQL_endpoint, // Server URL
      credentials: 'include',
      fetch,
    }),
  ),
  cache: new InMemoryCache(),
});

export const ExecGraphQL = async (query: DocumentNode, variables = {}) => {
  try {
    const { data } = await client.query({ query, variables, fetchPolicy: 'no-cache' });
    return data;
  } catch (err) {
    return { error: true, graphQLErrors: err && err.graphQLErrors, message: err };
  }
};
