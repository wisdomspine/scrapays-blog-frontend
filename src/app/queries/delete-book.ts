import { gql } from "@apollo/client";

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    delete(id: $id)
  }
`;
