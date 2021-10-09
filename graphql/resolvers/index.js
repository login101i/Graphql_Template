const postResolvers = require("./post");
const usersResolvers = require("./user");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => {
      console.log(parent);
      console.log("Wyżej console log z index.js w resolvers")
      return parent.likes.length;
    //? Przy funkcji strzałkowej chyba trzeba robić return
    },
    commentCount: (parent) => parent.comments.length,

    //? Sprawdź co to jest ten parent,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
