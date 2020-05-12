import { GraphQLServer } from 'graphql-yoga'
import * as pgPromise from 'pg-promise';
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import { PgUsers } from './model/DBObject/PgUsers';

const options = {
  port: 8080,
};

const pgp = require('pg-promise')();
const db = pgp("postgres://theuser:thepwd@db:5432/db");

const test = new PgUsers(db);
test.one("1");

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.howtographql1.com',
  description: 'Fullstack tutorial for GraphQL1'
},
]
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    links: () => links,
    link: (parent, args) => {
      for (const link of links) {
        if (typeof link !== "undefined" && link.id === args.id) {
          return link;
        }
      }
      return null;
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
  Mutation: {
    post: (_, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    update: (_, args) => {
      for (let link of links) {
        if (typeof link !== "undefined" && link.id === args.id) {
          link.description = args.description ?? link.description;
          link.url = args.url ?? link.url;
          return link;
        }
      }
      return null;
    },
    delete: (_, args) => {
      for (let i = 0; i < links.length; i++) {
        if (typeof links[i] !== "undefined" && links[i].id === args.id) {
          const link = links[i];
          delete links[i];
          return link;
        }
      }
      return null;
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/graphQL/schema/schema.graphql',
  resolvers,
})
server.start(options, () => console.log(`Server is running on http://localhost:${options.port}`))