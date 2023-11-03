import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
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

export function GraphQLProvider({ children }: PropsWithChildren) {
  const { getAccessTokenSilently } = useAuth0();
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_BASE_URL,
  });
  /**
   * Authorization middleware for adding access tokens to our request
   */
  const authLink = setContext(async (operation, context) => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });
  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
    typeDefs,
    credentials: "include",
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
