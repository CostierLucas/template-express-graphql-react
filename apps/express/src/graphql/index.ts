import { readFileSync } from 'fs';
import path from 'path';
import { resolvers as userResolvers } from './resolvers/user.resolver';

const userTypes = readFileSync(
  path.join(__dirname, './graphql/types/user.graphql'),
  {
    encoding: 'utf-8',
  }
);

export const typeDefs = `
    ${userTypes}
`;

export const resolvers = {
  ...userResolvers,
};
