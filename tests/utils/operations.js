import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

const login = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const me = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const users = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export { createUser, login, me, users };
