import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

import userModel from './models/user-model';
import articleModel from './models/article-model';

const resolvers = {
  Query: {
    articles: async (root, { limit }) => await articleModel.getAll({ limit }),
    article: async (root, { articleId }) =>
      await articleModel.getById({ articleId }),
  },
  Mutation: {
    createArticle: async (parent, { article: { title, content } }) =>
      await articleModel.insertOne({ title, content }),
    signIn: async (parent, { credentials: { email, password } }) =>
      await userModel.signIn({ email, password }),
    signUp: async (parent, { credentials: { email, password } }) =>
      await userModel.signUp({ email, password }),
  },
  Article: {
    createdAt: (parent) => {
      return parent._id.getTimestamp();
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

export default resolvers;
