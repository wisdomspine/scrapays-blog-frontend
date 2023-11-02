import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { PropsWithChildren } from "react";

const typeDefs = gql`
  # ------------------------------------------------------
  # THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
  # ------------------------------------------------------

  type Book {
    id: Int!
    title: String!
    description: String!
    createdOn: DateTime!
    updatedOn: DateTime!
  }

  """
  A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  """
  scalar DateTime

  type Query {
    book(id: Int!): Book!
    books(
      """
      Search string
      """
      s: String = ""
    ): [Book!]!
  }

  type Mutation {
    create(data: BookDto!): Book!
    update(id: Int!, update: BookDto!): Book!
    delete(id: Int!): String!
  }

  input BookDto {
    title: String!
    description: String!
  }
`;
const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URL,
  cache: new InMemoryCache(),
  typeDefs,
});

export function GraphQLProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
