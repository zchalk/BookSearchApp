const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent,  {args}) => {
      return User.findOne({ args }).populate('books');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate('books');
      } else {
        throw new AuthenticationError('You must be logged in.')
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, args, context) => {
      if (context.user) {
        const Book = await Book.create({ args });
        await User.findOneAndUpdate(
          {_id: context.user._id},
          { $addToSet: { books: Book._id }},
          { new: true, runValidators: true}, 
      );
      return ?;
    }

      
    },
    
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: { books: {bookId} } },
          {new: true}
        )
      }
      return ?;
    },
  },
};

module.exports = resolvers;
