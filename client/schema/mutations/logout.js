import gql from 'graphql-tag';

const logout = gql`
  mutation {
    logout {
      email
      id
    }
  }
`;

export default logout;
