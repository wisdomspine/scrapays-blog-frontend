import { gql } from "@apollo/client";

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: Int!, $data: BookDto!) {
    update(id: $id, update: $data) {
      id
      title
      description
      updatedOn
      createdOn
    }
  }
`;
