import { ApolloClient, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import { cache } from './cache';
import { getToken } from '#/shared/utils/token';
import { Platform } from '#/shared/utils/type';
import { omitDeep } from '#/shared/utils/omitDeep';

const mainLink = new HttpLink({ uri: import.meta.env.VITE_BASE_URL });

const withToken = setContext(async () => {
  const token = await getToken();
  return { token };
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const { headers, token } = operation.getContext();
  operation.setContext({
    headers: {
      ...headers,
      platform: [Platform.Client],
      ...(token && {
        authorization: `Bearer ${token}`,
      }),
    },
  });
  return forward(operation);
});

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables && !operation.variables.file) {
    operation.variables = omitDeep(operation.variables, '__typename');
  }
  return forward(operation);
});

export const client = new ApolloClient({
  cache,
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  link: from([cleanTypenameLink, withToken, authMiddleware, mainLink]),
});
