import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const schema = gql`
  type User {
    id: ID!
    email: String!
    passwordHashed: String!
    createdAt: Int!
    todos: [Todo!]!
  }

  enum TodoStatus {
    DONE
    TODO
  }

  type Todo {
    id: ID!
    content: String!
    status: TodoStatus!
    createdAt: Int!
    updatedAt: Int!
    user: User!
  }

  type Query {
    allUsers: [User]
    allTodos: [Todo]
    user(id: ID!): User
    todo(id: ID!): Todo
    userTodos: [Todo]
  }

  input TodoInput {
    id: ID!
    content: String
    status: TodoStatus
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    createTodo(content: String!): Todo
    updateTodo(todo: TodoInput!): Todo
    deleteTodo(id: ID!): Boolean
    token(email: String!, password: String!): String
  }
`;
