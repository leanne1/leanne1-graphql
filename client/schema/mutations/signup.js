import gql from 'graphql-tag';

const signup = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      email
      id
    }
  }
`;

export default signup;
