import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './graphql';
import { auth, requiresAuth } from 'express-openid-connect';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const SECRET_SEED = process.env.SECRET_SEED;
const CLIENT_ID = process.env.CLIENT_ID;
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET_SEED,
  baseURL: 'http://localhost:4000',
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL,
};

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(auth(config));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/graphql', expressMiddleware(server));

  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

  app.listen(port, () => {
    console.log(`🚀 Express ready at http://localhost:${port}`);
    console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
