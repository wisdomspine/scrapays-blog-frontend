import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($data: BookDto!) {
    create(data: $data) {
      id
      title
      description
      updatedOn
      createdOn
    }
  }
`;
