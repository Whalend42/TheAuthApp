import { GraphQLServer } from 'graphql-yoga'
import { PgUsers } from './model/DBObject/PgUsers';
import { User } from './model/Interface/User';

const options = {
  port: 8080,
};

const pgp = require('pg-promise')();
const db = pgp("postgres://theuser:thepwd@db:5432/db");

const pgUsers = new PgUsers(db);

const resolvers = {
  User: {
    id: async (parent: User) => await parent.id(),
    email: async (parent: User) => await parent.email(),
    name: async (parent: User) => await parent.name(),
  },
  AuthPayload: {
    token: ,
    user: ,
  },

  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    users: async () => await pgUsers.many(),
    user: async (_, args) => await pgUsers.one(args.id)
  },
  Mutation: {
    signup: async (_, args) => await pgUsers.add(args.email, args.name, args.secret),
    login: async (_, args) => {
      const user = await pgUsers.findFromEmail(args.email);
      const success = user.login();
    },
    deleteUser: async (_, args) => await pgUsers.delete(args.id),
    //signup(email: String!, name: String!, secret: String!): AuthPayload!
    //login(email: String!, password: String!): AuthPayload
    //deleteUser(id: String!): User!
  },
}

const server = new GraphQLServer({
  typeDefs: './src/graphQL/schema/schemav2.graphql',
  resolvers,
});
server.start(options, () => console.log(`Server is running on http://localhost:${options.port}`))