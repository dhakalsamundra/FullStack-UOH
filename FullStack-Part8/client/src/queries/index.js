import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
  allAuthors  {
    name
    born
    id
  }
}
`

export const ALL_BOOKS = gql`
  query {
  allBooks  {
    id
    title
    published
    author 
    genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

export const EDIT_BIRTH = gql`
  mutation editAuthorBirth($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      id
      name
      born
      bookCount
    }
  }
`;