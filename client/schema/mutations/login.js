import gql from 'graphql-tag';

const login = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      id
    }
  }
`;

export default login;
