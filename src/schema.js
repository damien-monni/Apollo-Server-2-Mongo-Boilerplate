import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date

  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    UNKNOWN
  }

  type Article {
    _id: ID!
    createdAt: Date!
    title: String!
    content: String!
  }

  input ArticleInput {
    title: String!
    content: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type User {
    email: String
    password: String
  }

  type UserTokens {
    authToken: String
  }

  type Query {
    articles(limit: Int): [Article]
    article(articleId: ID!): Article
  }

  type Mutation {
    createArticle(article: ArticleInput): Article @auth(requires: USER)
    signUp(credentials: SignUpInput): UserTokens
    signIn(credentials: SignInInput): UserTokens
  }

`;

export default typeDefs;
