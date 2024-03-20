const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {

    me: async (parent, args, context) => {

      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;

      }

      throw AuthenticationError("Not logged in");

    },

  },

  Mutation: {
    addUser: async (parent, args) => {

      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };

    },

    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email });

      if (!user) {

        throw new AuthenticationError("No user found with this email address")

      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };

    },

    saveAnime: async (parent, { animeData }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedAnimes: animeData } },
          { new: true }
        );
        return updateUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeAnime: async (parent, { animeId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pul: { savedAnimes: { animeId } } },
          { new: true }
        );

        return updateUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    }
  }
};

module.exports = resolvers;