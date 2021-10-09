const Post = require("../../models/Post");
const {AuthenticationError,  UserInputError } = require("apollo-server");

//
module.exports = {
  Mutation: {
    //? Poniżej zrobimy funkcję strzałkową, troszkę inaczej
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      //? Tutaj zwracamy user ale możemy od razu zdestrukturalizować user i pobrać username

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
      //? hmm to nie powinno być w innej linijce
    },

    //next mutation

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
        //? nie ma takiego czegoś jak remove
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
