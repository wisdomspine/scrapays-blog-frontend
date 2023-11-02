import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($s: String = "") {
    books(s: $s) {
      id
      title
      description
      updatedOn
      createdOn
      deleting @client
    }
  }
`;
