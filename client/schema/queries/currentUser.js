import gql from 'graphql-tag';

const currentUser = gql`
  query {
    user {
      email
      id
    }
  }
`;

export default currentUser;
