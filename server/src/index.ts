import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import schema from './schema';

const server = new ApolloServer({
  schema,
  context: createContext(),
});

server.listen().then((info) => console.log(`🚀 Server ready at ${info.url}`));
