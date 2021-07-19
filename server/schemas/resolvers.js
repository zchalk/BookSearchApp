const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent,  {args}) => {
      return User.findOne({ args }).populate('savedBooks');
    },
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate('savedBooks');
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
      console.log(user);console.log(token)

      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const update = await User.findOneAndUpdate(
          {_id: context.user._id},
          { $addToSet: { savedBooks: {...args} }},
          { new: true, runValidators: true}, 
      );
      console.log(update)
      return update;
    }

      
    },
    
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
          );

          return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
}
};

module.exports = resolvers;
