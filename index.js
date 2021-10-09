const { ApolloServer, PubSub } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const { MONGODB } = require("./config");

const pubsub = new PubSub();



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});


mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB Connected");
    return server.listen({ PORT: 5000 });
  })
  .then((res) => {
    //? nawias klamrowy przy port?
    console.log(`Serwer działa na porcie ${res.url}`);
  });
