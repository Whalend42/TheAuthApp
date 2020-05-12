import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const port = 8080;




// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type AuthPayload {
    longToken: String!
    refreshToken: String!
    user: User!
  }
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    login(email: String!, secret: String!): AuthPayload!
    refresh(email: String!, refreshToken: String!): String!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
/*


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope! modified');
});

app.post('/login', (req, res) => {
  const json = {
    user : {
      id: 1,
      refreshToken: 22
    }
  };
  res.send(JSON.stringify(json));
});

app.post('/refresh/:userId', (req, res) => {
  console.log(req.params);
  const json = {
    user : {
      id: req.params.userId,
      token: 33
    }
  };
  res.send(JSON.stringify(json));
});*/

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
